import { Company } from '../Models/company.model.js';

export const createCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:'Company name is required.',
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:'Company already exists.',
                success:false
            });
        }
        company = await Company.create({
            name:companyName,
            userId:req.user.id
        });
        return res.status(201).json({
            message:'Company created successfully.',
            success:true,
            company
        });
    } catch (error) {
        console.log(error);
        //return res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

export const getAllCompanies = async (req, res) => {
    try{
        const userId = req.user.id;
        const companies = await Company.find({userId});
        if(!companies || companies.length === 0){
            return res.status(404).json({
                message:'No companies found.',
                success:false
            });
        }
        return res.status(200).json({
            message:'Companies fetched successfully.',
            success:true,
            companies
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:'Company not found.',
                success:false
            });
        }  
        return res.status(200).json({
            message:'Company fetched successfully.',
            success:true,
            company
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCompanyById = async (req, res) => {
    try{
        const companyId = req.params.id;
        const {name, description, website, location} = req.body;
        const updateData = {name, description, website, location};
        const company = await Company.findByIdAndUpdate(companyId, updateData, {new:true});
        if(!company){
            return res.status(404).json({
                message:'Company not found.',
                success:false
            });
        }  
        return res.status(200).json({
            message:'Company updated successfully.',
            success:true,
            company
        });
    } catch (error) {
        console.log(error);
    }
}
