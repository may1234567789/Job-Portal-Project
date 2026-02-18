import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized access token.',
                success: false
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ 
                message: 'Unauthorized access decode.',
                success: false
            });
        }
        req.user = decode;
        next();
    } catch (error) {
        console.log('Auth middleware error:', error);
        return res.status(401).json({
            message: 'Authentication failed.',
            success: false,
        });
    }
}

export default isAuth;