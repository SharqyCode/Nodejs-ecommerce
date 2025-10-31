// controllers/userController.js
const User = require('./../models/UserModel');
const catchAsync = require('./../utils/catchAsync');
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
     res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
 return res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const uploadAvatar = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: "fail", message: "No file uploaded" });
  }
console.log(`requsest body ${req.file.filename}`)
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { avatar: `uploads/${req.file.filename}`},
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const bcrypt = require("bcryptjs");

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { name, email, oldPassword, newPassword } = req.body;

  const user = await User.findById(userId).select("+password");
  if (!user) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }


  if (name) user.name = name;
  if (email) user.email = email;

  
  if (newPassword) {
  if (!oldPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide your old password to set a new one",
    });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect old password",
    });
  }

  user.password = newPassword;
  user.passwordConfirm = newPassword; 
}

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    data: { user },
  });
});




module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  uploadAvatar,
  updateProfile
};
