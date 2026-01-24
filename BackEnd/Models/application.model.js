import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        enum: ['applied', 'under-process', 'rejected'],
        default: 'under-process'
    },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;