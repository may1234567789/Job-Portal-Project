import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required.' });
        }
        // Registration logic here
        const { username, password, email, phoneNumber, role } = req.body;
        if (!username || !password || !email || !phoneNumber || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists.',sucess:false });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: passwordHash,
            email,
            phoneNumber,
            role    
        });
        return  res.status(201).json({ message: 'User registered successfully.',sucess:true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', success: false });
    }

}

export const login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required.' });
        }
        //Login logic
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.', sucess: false });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist.', sucess: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.', sucess: false });
        }
        if (user.role !== role) {
            return res.status(400).json({ message: 'Role mismatch.', sucess: false });
        }
        const tokenData = {
            id: user.id,
            username: user.username,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ message: 'Login successful.', sucess: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', success: false });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({ message: 'Logout successful.', sucess: true });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required.' });
        }
        const { username, email, phoneNumber, bio , skills } = req.body;
        if (!username || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ 
                message: 'All fields are required.', 
                sucess: false });
        };
        const skillArray = skills.split(',');
        const userId = req.user.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found.', 
                sucess: false });
        }
        user.username = username;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillArray;

        await user.save();
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({ 
            message: 'Profile updated successfully.', 
            sucess: true, 
            user 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', success: false });
    }
}