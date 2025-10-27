
const mongoose = require('mongoose')
const validator = require('validator');

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user must have a name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'

    },
    photo: String,
    password: {
        type: String,
        require: [true, "please provide a password"],
        minlenght: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "please confirm you password"],
        validate: {
            validator: function (el) {
                return this.password == el
            },
            message: "passwords are not the same"
        }
    },
   passwordChangeAt:Date  

}

);
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);

    // If password changed after the token was issued, return true
    return JWTTimestamp < changedTimestamp;
  }

  // False means password NOT changed after token issued
  return false;
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next()

})

const User =mongoose.models.User||mongoose.model('User',userSchema)
module.exports = User