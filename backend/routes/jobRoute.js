import { Router } from 'express';
import {
  addJob,
  deleteItem,
  getJobByEmail,
  getJobs,
  getJobsById,
  updateJob,
} from '../controllers/jobController.js';
import verifyToken from '../middleware/verifytoken.js';

const jobRouter = Router();

// add job
jobRouter.post('/add-job', verifyToken, addJob);
// get all job
jobRouter.get('/jobs', getJobs);
// get job by id
jobRouter.get('/jobs/:id', getJobsById);
// get user posted job
jobRouter.get('/user-jobs/:email', verifyToken, getJobByEmail);
// update data
jobRouter.patch('/job/:id', verifyToken, updateJob);
// delete item
jobRouter.delete('/job/:id', verifyToken, deleteItem);

export default jobRouter;
