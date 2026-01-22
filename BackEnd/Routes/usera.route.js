import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { login, register, updateProfile, logout } from '../controls/user.control.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout)
router.route('/profile/update').post(isAuth,updateProfile);

export default router;