import { Job }  from '../Models/job.model.js';


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, company, location, jobType, experience, position, companyId } = req.body;
        const userId = req.user.id;
        if (!title || !description || !company || !location || !salary || !experience || !companyId || !position || !jobType || !requirements) {
            return res.status(400).json({ 
                message: "Missing required fields",
                success: false 
            });
        }
        const job = await Job.create({
            title,
            description,
            company: companyId,
            location,
            salary,
            experience,
            createdBy: userId,
            postedAt: new Date(),
            requirements: requirements.split(','),
            jobType,
            position
        });
        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        });
    } 
    catch (error) {
        console.error("Error posting job:", error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const Keywords = req.query.keywords || "";
        const query = {
            $or: [
                { title: { $regex: Keywords, $options: 'i' } },
                { description: { $regex: Keywords, $options: 'i' } }
            ]
        };
        const jobs = await Job.find(query).populate({path : 'company'}).sort({ createdAt: -1 });
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs
        });
        
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
}

export const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate([
            { path: 'applications' },
            { path: 'company', select: 'name location' }
        ]);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Job fetched successfully",
            success: true,
            job
        });
    } catch (error) {
        console.log("Error fetching job by ID:", error);  
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await Job.find({ createdBy: userId }).populate('company', 'name location').sort({ createdAt: -1 }).exec();
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found for this admin",
                success: false
            });
        }
        return res.status(200).json({
            message: "Admin jobs fetched successfully",
            success: true,
            jobs
        });
    } catch (error) {
        console.log("Error fetching admin jobs:", error);
    }
}

export const updateJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        if (!title || !description || !location || !salary || !experience || !companyId || !position || !jobType || !requirements) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const updatedJob = await Job.findOneAndUpdate(
            { _id: jobId, createdBy: userId },
            {
                title,
                description,
                requirements: typeof requirements === 'string' ? requirements.split(',').map((item) => item.trim()).filter(Boolean) : requirements,
                salary,
                location,
                jobType,
                experience,
                position,
                company: companyId
            },
            { new: true }
        ).populate('company', 'name location');

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully",
            success: true,
            job: updatedJob
        });
    } catch (error) {
        console.log("Error updating job:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const deleteJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });
    } catch (error) {
        console.log("Error deleting job:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
