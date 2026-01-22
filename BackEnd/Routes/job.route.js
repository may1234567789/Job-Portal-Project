import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { postJob, getAllJobs, getAdminJobs, getJobById } from '../controls/job.control.js';

const jobRouter = express.Router();

jobRouter.route('/post').post(isAuth, postJob);
jobRouter.route('/get').get(isAuth, getAllJobs);
jobRouter.route('/get/:id').get(isAuth, getJobById);
jobRouter.route('/getadminjob').put(isAuth, getAdminJobs);

export default jobRouter;