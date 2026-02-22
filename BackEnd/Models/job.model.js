import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String,
    }],
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-Time', 'part-time', 'contract', 'internship'],
        required: true,
    },
    position:{
        type: String,
        required: true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
}, { timestamps: true });

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);