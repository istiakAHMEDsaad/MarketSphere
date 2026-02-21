import { Router } from 'express';
import { addJob, deleteItem, getJobByEmail, getJobs, getJobsById } from '../controllers/jobController.js';

const jobRouter = Router();

jobRouter.post('/add-job', addJob);
jobRouter.get('/jobs', getJobs);
jobRouter.get('/jobs/:id', getJobsById);
jobRouter.get('/user-jobs/:email', getJobByEmail);
jobRouter.delete('/job/:id', deleteItem);

export default jobRouter;
