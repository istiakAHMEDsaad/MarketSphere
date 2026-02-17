import { Router } from "express";
import { addJob } from "../controllers/jobController.js";

const jobRouter = Router();

jobRouter.post('/add-job', addJob);
jobRouter.get('/jobs', () => {});
jobRouter.delete('/job/:id', () => {});

export default jobRouter;