import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { createCompany, getAllCompanies, getCompanyById, updateCompanyById } from '../controls/company.control.js';

const companyRouter = express.Router();

companyRouter.route('/register').post(isAuth, createCompany);
companyRouter.route('/get').get(isAuth, getAllCompanies);
companyRouter.route('/get/:id').get(isAuth, getCompanyById);
companyRouter.route('/update/:id').put(isAuth, updateCompanyById);

export default companyRouter;