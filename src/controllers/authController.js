const AppError = require('../utils/appError')
const User=require('./../models/userModel')
const catchAsync=require('./../utils/catchAsync')
const jwt=require('jsonwebtoken')
const {promisify}=require('util')

const signToken=id=>{
    return jwt.sign({
            id: id
        },
    process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

const signup=catchAsync(async (req,res,next)=>{
        const newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm,
            role:req.body.role,
           passwordChangeAt:req.body.passwordChangeAt
        })
        const token=signToken(newUser._id)
        res.status(201).json({
            status:'success',
            token,
            data:{
                user:newUser,
            }
        })

})

const login=catchAsync(async (req,res,next)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(404).json({
      status: 'fail',
      message: "enter a password and email",
    });
    }

    const user=await User.findOne({email:email}).select('+password')
    //const correct=await user.correctPassword(password,user.password)
    if(!user||!(await user.correctPassword(password,user.password))){
          return res.status(401).json({
      status: 'fail',
      message: "incoreect email or password",
    });
    }


    const token= signToken(user._id)
      res.status(200).json({
      status: 'success',
      token
    });


})

const protectLogOnly=catchAsync(async (req,res,next)=>{
    
 let token;
  if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1];
      
  }
  //console.log(token)
  if(!token){
     return  res.status(401).json({
      status: 'you are not logged in please log in to get access.',
    })
  }

const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
console.log(decoded)
 
const freshUser=await User.findById(decoded.id)
if(!freshUser){
    return next(
        new AppError("the user is no longer exist",401)
    )
}
console.log(freshUser)

 if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }
req.user=freshUser
next()




}
)
const restrictTo=(...roles)=>{
        return (req,res,next)=>{
            if(!roles.includes(req.user.role)){
                return next(new AppError('tou donot have permissino to delete',403))
            }
            next()
        }
}

module.exports={
signup,
login,
protectLogOnly,
restrictTo
}