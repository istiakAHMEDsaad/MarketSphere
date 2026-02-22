import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../utils/axiosInstance';

const AddJob = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addJob = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post('/jobs/add-job', formData);
      return data;
    },

    onSuccess: () => {
      toast.success('Job added successfully');
      queryClient.invalidateQueries(['myJobs', user?.email]);
      queryClient.invalidateQueries(['allJobs']);
      document.querySelector('form').reset();
      navigate('/my-posted-jobs');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      title: form.job_title.value,
      buyer: {
        email: form.email.value,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      deadline: startDate,
      category: form.category.value,
      min_price: parseFloat(form.min_price.value),
      max_price: parseFloat(form.max_price.value),
      description: form.description.value,
      bid_count: 0,
    };

    addJob.mutate(formData);
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12 px-4'>
      <section className='card w-full max-w-4xl bg-base-100 shadow-2xl border border-base-200'>
        <div className='card-body p-6 md:p-10'>
          <div className='flex items-center gap-2 mb-6'>
            <div className='bg-info w-2 h-8 rounded-full'></div>
            <h2 className='card-title text-2xl font-bold text-base-content capitalize'>
              Post a New Job
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Job Title */}
              <div className='form-control'>
                <label className='label' htmlFor='job_title'>
                  <span className='label-text font-semibold'>Job Title</span>
                </label>
                <input
                  id='job_title'
                  name='job_title'
                  placeholder='e.g. Senior React Developer'
                  type='text'
                  className='input input-bordered w-full transition-all'
                  required
                />
              </div>

              {/* Email */}
              <div className='form-control'>
                <label className='label' htmlFor='emailAddress'>
                  <span className='label-text font-semibold'>
                    Email Address
                  </span>
                </label>
                <input
                  id='emailAddress'
                  type='email'
                  name='email'
                  placeholder='contact@company.com'
                  defaultValue={user?.email}
                  disabled={true}
                  className='input input-bordered w-full transition-all'
                  required
                />
              </div>

              {/* Category */}
              <div className='form-control'>
                <label className='label' htmlFor='category'>
                  <span className='label-text font-semibold'>Category</span>
                </label>
                <select
                  name='category'
                  id='category'
                  className='select select-bordered w-full'
                >
                  <option value='Web Development'>Web Development</option>
                  <option value='Graphics Design'>Graphics Design</option>
                  <option value='Digital Marketing'>Digital Marketing</option>
                </select>
              </div>

              {/* Deadline */}
              <div className='form-control flex flex-col'>
                <label className='label'>
                  <span className='label-text font-semibold'>Deadline</span>
                </label>
                <DatePicker
                  className='input input-bordered w-full transition-all'
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              {/* Min Price */}
              <div className='form-control'>
                <label className='label' htmlFor='min_price'>
                  <span className='label-text font-semibold'>
                    Minimum Price ($)
                  </span>
                </label>
                <input
                  id='min_price'
                  name='min_price'
                  type='number'
                  placeholder='500'
                  className='input input-bordered w-full transition-all'
                />
              </div>

              {/* Max Price */}
              <div className='form-control'>
                <label className='label' htmlFor='max_price'>
                  <span className='label-text font-semibold'>
                    Maximum Price ($)
                  </span>
                </label>
                <input
                  id='max_price'
                  name='max_price'
                  type='number'
                  placeholder='1000'
                  className='input input-bordered w-full transition-all'
                />
              </div>
            </div>

            {/* Description */}
            <div className='form-control flex flex-col mt-6'>
              <label className='label' htmlFor='description'>
                <span className='label-text font-semibold'>
                  Job Description
                </span>
              </label>
              <textarea
                placeholder='Describe the job requirements and responsibilities...'
                className='textarea textarea-bordered h-32 text-base'
                name='description'
                id='description'
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className='card-actions justify-end mt-8'>
              <button className='btn btn-info btn-wide text-white font-bold hover:scale-105 transition-all'>
                {addJob.isPending ? (
                  <span className='loading loading-spinner loading-xs'></span>
                ) : (
                  'Save & Post Job'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddJob;
