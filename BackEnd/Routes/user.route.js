import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { login, register, updateProfile, logout } from '../controls/user.control.js';
import { singleUpload } from '../Middleware/multer.js';

const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logoutr").post(logout);
router.route("/profile/update").post(isAuth,updateProfile);

export default router;