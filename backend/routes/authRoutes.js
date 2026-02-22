import { Router } from 'express';
import { createJWT, logout } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/jwt', createJWT);
authRouter.get('/logout', logout);

export default authRouter;