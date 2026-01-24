import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { applyJob,  getAppliedJobs, getApplicants, updateStatus} from '../controls/application.control.js';

const applicationRoutes = express.Router();

applicationRoutes.route('/apply/:id').get(isAuth, applyJob);
applicationRoutes.route('/get').get(isAuth, getAppliedJobs);
applicationRoutes.route('/:id/applicants').get(isAuth, getApplicants);
applicationRoutes.route('/status/:id/update').post(isAuth, updateStatus);

export default applicationRoutes;