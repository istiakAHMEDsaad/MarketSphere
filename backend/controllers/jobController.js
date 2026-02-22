import jobSchema from '../models/job.js';

// add jobs
export const addJob = async (req, res) => {
  try {
    const job = req.body;

    if (req.user.email !== job.buyer.email) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden access',
      });
    }

    const jobData = await jobSchema.create(job);

    res.status(201).json({
      success: true,
      message: 'Job added successfully',
      jobData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add job',
    });
  }
};

// get all jobs
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

// get job by email
export const getJobByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (req.user.email !== email) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }

    const jobs = await jobSchema.find({ 'buyer.email': email });

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed' });
  }
};

// update an item
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    const job = await jobSchema.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (req.user.email !== job.buyer.email) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }

    const updatedJob = await jobSchema.findByIdAndUpdate(
      id,
      { $set: jobData },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update job',
    });
  }
};

// delete item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobSchema.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (req.user.email !== job.buyer.email) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete',
      });
    }

    await jobSchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Delete failed' });
  }
};

// for put method \\
/*
export const replaceJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Job ID',
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (req.user.email !== job.buyer.email) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }

    const replacedJob = await Job.findOneAndReplace(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Job replaced successfully',
      replacedJob,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to replace job',
    });
  }
};
*/