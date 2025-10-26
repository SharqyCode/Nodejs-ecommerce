const User=require('./../models/UserModel')
const catchAsync=require('./../utils/catchAsync')
const jwt=require('jsonwebtoken')

const signToken=id=>{
    return jwt.sign({
            id: id
        },
    process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

signup=catchAsync(async (req,res,next)=>{
        const newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
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

module.exports={
signup,
login
}