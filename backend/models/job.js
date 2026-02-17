import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    buyer: {
      email: String,
      name: String,
      photo: String
    },
    deadline: { type: Date, required: true },
    category: { type: String, required: true },
    min_price: { type: Number, required: true },
    max_price: { type: Number, required: true },
    description: { type: String, required: true },
    bid_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Job', jobSchema);
