import { Router } from 'express';
import verifyToken from '../middleware/verifytoken.js';
import {
  addBid,
  getBids,
  updateBidStatus,
} from '../controllers/bidsController.js';

const bidRouter = Router();

// post a bid
bidRouter.post('/', verifyToken, addBid);
bidRouter.get('/:email', getBids);
bidRouter.patch('/:id', updateBidStatus);

export default bidRouter;
