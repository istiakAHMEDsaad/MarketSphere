import { Router } from 'express';
import { addJob, getJobs, getJobsById } from '../controllers/jobController.js';

const jobRouter = Router();

jobRouter.post('/add-job', addJob);
jobRouter.get('/jobs', getJobs);
jobRouter.get('/jobs/:id', getJobsById);
jobRouter.delete('/job/:id', () => {});

export default jobRouter;
