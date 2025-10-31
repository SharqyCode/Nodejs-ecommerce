 
const express=require("express");
const {getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,getProfile,uploadAvatar,
    updateProfile}=require("./../controllers/userController")

const {signup,login, protectLogOnly,restrictTo,resetPassword,forgotPassword}=require('../controllers/authController')
const upload = require("../utils/upload");

const router=express.Router();
router.post('/signup',signup)
router.post('/login',login);
router.post('/forgetpass',forgotPassword)
router.patch('/resetPassword/:token',resetPassword)
router.get("/profile", protectLogOnly, getProfile);
router.post("/:id/upload-avatar", upload.single("avatar"), uploadAvatar);
router.patch("/update-profile", protectLogOnly, updateProfile);

router.route(`/`).get(getAllUsers).post(createUser);
router.route(`/:id`).get(getUser).patch(updateUser).delete(protectLogOnly,restrictTo('admin'),deleteUser);

module.exports=router;