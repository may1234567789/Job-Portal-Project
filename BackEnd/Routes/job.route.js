import express from 'express';
import isAuth from '../Middleware/isauth.js';
import { postJob, getAllJobs, getAdminJobs, getJobById, updateJobById, deleteJobById } from '../controls/job.control.js';

const jobRouter = express.Router();

jobRouter.route('/post').post(isAuth, postJob);
jobRouter.route('/get').get(isAuth, getAllJobs);
jobRouter.route('/get/:id').get(isAuth, getJobById);
jobRouter.route('/getadminjob').get(isAuth, getAdminJobs);
jobRouter.route('/update/:id').put(isAuth, updateJobById);
jobRouter.route('/delete/:id').delete(isAuth, deleteJobById);

export default jobRouter;
