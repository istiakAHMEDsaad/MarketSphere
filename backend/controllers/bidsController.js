import mongoose from 'mongoose';
import bidSchema from '../models/bid.js';
import jobSchema from '../models/job.js';

// add a bid
export const addBid = async (req, res) => {
  try {
    const bidData = req.body;

    const alreadyExist = await bidSchema.findOne({
      email: bidData.email,
      jobId: bidData.jobId,
    });

    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        message: 'You have already placed a bid on this job!',
      });
    }

    // create bid
    const bid = await bidSchema.create(bidData);

    // update bid
    await jobSchema.findByIdAndUpdate(bidData.jobId, {
      $inc: { bid_count: 1 },
    });

    res.status(201).json({
      success: true,
      bid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to place bid',
    });
  }
};

// get the bids data
export const getBids = async (req, res) => {
  try {
    const { email } = req.params;
    const isBuyer = req.query.buyer;

    let query = {};

    if (isBuyer) {
      query.buyer = email;
    } else {
      query.email = email;
    }

    const bids = await bidSchema.find(query);

    res.status(200).json({
      success: true,
      bids,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get bids',
    });
  }
};

// update bids
export const updateBidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bid ID',
      });
    }

    const updatedBid = await bidSchema.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      updatedBid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update bid',
    });
  }
};
