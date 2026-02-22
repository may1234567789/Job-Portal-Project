import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
        cloud_name: 'dy761kpfb', 
        api_key: '937561364387978', 
        api_secret: process.env.API_SECRET
    });

export default cloudinary;