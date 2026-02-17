import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { login, register, updateProfile, logout } from '../controls/user.control.js';
import { singleUpload } from '../Middleware/multer.js';

const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(isAuth, singleUpload, updateProfile);

export default router;
