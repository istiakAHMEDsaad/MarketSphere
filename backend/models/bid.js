import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },

    title: String,
    category: String,

    price: {
      type: Number,
      required: true,
    },

    email: {
      type: String, // bidder email
      required: true,
    },

    buyer: {
      type: String, // job owner email
      required: true,
    },

    comment: String,

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Bid', bidSchema);
