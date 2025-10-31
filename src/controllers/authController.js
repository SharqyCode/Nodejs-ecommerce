const AppError = require('../utils/appError')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const sendEmail = require('./../utils/email')
const crypto = require('crypto')
const signToken = id => {
  return jwt.sign({
    id: id
  },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    passwordChangeAt: req.body.passwordChangeAt
  })
  const token = signToken(newUser._id)
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    }
  })

})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(404).json({
      status: 'fail',
      message: "enter a password and email",
    });
  }

  const user = await User.findOne({ email: email }).select('+password')
  //const correct=await user.correctPassword(password,user.password)
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: "incoreect email or password",
    });
  }


  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    token
  });


})

const protectLogOnly = catchAsync(async (req, res, next) => {

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

  }
  //console.log(token)
  if (!token) {
    return res.status(401).json({
      status: 'you are not logged in please log in to get access.',
    })
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  console.log(decoded)

  const freshUser = await User.findById(decoded.id)
  if (!freshUser) {
    return next(
      new AppError("the user is no longer exist", 401)
    )
  }
  console.log(freshUser)

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }
  req.user = freshUser
  next()




}
)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('tou donot have permissino to delete', 403))
    }
    next()
  }
}

const forgotPassword = catchAsync(async (req, res, next) => {
  console.log('wwwwwwwwwwwwwwwwwww', req.body)
  const user = await User.findOne({ email: req.body.email })
  console.log('userrrrr', user)
  if (!user) {
    return next(new AppError('There is no user with email address.', 404))
  }


  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`

  const message = `Forgot your password ? submit a a PATCH request with you new password and password confirm to: ${resetURL}.\n if you didnot forget your password please ignor this email !`
  try {
    await sendEmail({
      email: user.email,
      subject: 'Yur password reset token valid for 10 min',
      message: message
    })
  }
  catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false })
    return next(new AppError('there was an error sending the emial try again later !'), 500)
  }

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!'

  })

})
const resetPassword = catchAsync(async (req, res, next) => {


  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(hashedToken)
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }


  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangeAt = Date.now();
  await user.save();


  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });

});



module.exports = {
  signup,
  login,
  protectLogOnly,
  restrictTo,
  resetPassword,
  forgotPassword

}