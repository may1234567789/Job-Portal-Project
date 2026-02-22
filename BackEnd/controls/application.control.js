import Application from '../models/application.model.js';
import { Job } from '../models/job.model.js';

export const applyJob = async (req, res) => {
    try{
        const jobId = req.params.id;
        const userId = req.user.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job application submitted successfully",
            success: true,
            application: newApplication
        });

    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({
            message: "Error applying for job",
            success: false,
            error: error.message
        });
    }
}

export const getAppliedJobs = async (req, res) => {
    try{
        const userId = req.user.id;
        const applications = await Application.find({ applicant: userId }).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company', 
                options:{sort:{createdAt:-1}},
            }}).sort({ createdAt: -1 });
        if(!applications){
            return res.status(404).json({
                message: "No applied jobs found",
                success: false
            });
        };
        return res.status(200).json({
            message: "Applied jobs fetched successfully",
            success: true,
            applications
        });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Application.find({ job: jobId }).populate('applicant', 'name email resume').sort({ createdAt: -1 });
        if(!job){
            return res.status(404).json({
                message: "No applicants found for this job",
                success: false
            });
        }
        return res.status(200).json({
            message: "Applicants fetched successfully",
            success: true,
            job
        });
    } catch (error) {
        console/log("Error fetching applicants:", error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        if(!validStatuses.includes(status)){
            return res.status(400).json({
                message: "Invalid status value",
                success: false
            });
        }
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        application.status = status;
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            success: true,
            application
        });
    }catch (error) {
        console.error("Error updating application status:", error);
    }
}