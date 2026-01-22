import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['student', 'admin'],
    },
    profile:{
        bio:{type: String},
        skills:[{type: String}],
        resume:{type: String},
        resumeOriginalName:{type: String},
        company:{type: String},
        profilePicture:{type: String}
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);