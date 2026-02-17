import jobSchema from '../models/job.js';

// add jobs
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

// get jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await jobSchema.find();
    if (jobs.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: 'No job data found' });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log('Failed to get jobs data', error);
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong' });
  }
};

// get jobs by id
export const getJobsById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobSchema.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log('Failed to get job by id', error);
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong' });
  }
};
