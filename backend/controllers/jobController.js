import jobSchema from '../models/job.js';

export const addJob = async (req, res) => {
  try {
    const jobData = await jobSchema.create(req.body);
    return res
      .status(200)
      .json({ success: true, message: 'Job data added successfully', jobData });
  } catch (error) {
    console.log('Job data not added', error);
    return res
      .status(500)
      .json({ success: false, message: 'Job data failed to add' });
  }
};
