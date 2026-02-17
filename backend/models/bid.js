import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
  {
    email: String,
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    buyer: String,
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Bid', bidSchema);
