import { useMutation, useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../utils/axiosInstance';

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job_title: '',
      email: user?.email || '',
      category: 'Web Development',
      deadline: new Date(),
      min_price: '',
      max_price: '',
      description: '',
    },
  });

  const minPrice = watch('min_price');

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post('/jobs/add-job', formData);
      return data;
    },

    onSuccess: () => {
      toast.success('Job added successfully');
      queryClient.invalidateQueries({ queryKey: ['myJobs', user?.email] });
      queryClient.invalidateQueries({ queryKey: ['allJobs'] });
      reset();
      navigate('/my-posted-jobs');
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      title: data.job_title,
      buyer: {
        email: data.email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      deadline: data.deadline,
      category: data.category,
      min_price: parseFloat(data.min_price),
      max_price: parseFloat(data.max_price),
      description: data.description,
      bid_count: 0,
    };

    mutate(formattedData);
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12 px-4'>
      <section className='card w-full max-w-4xl bg-base-100 shadow-2xl border border-base-200'>
        <div className='card-body p-6 md:p-10'>
          <h2 className='card-title text-2xl font-bold mb-6'>Post a New Job</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Job Title */}
              <div>
                <label className='font-semibold'>Job Title</label>
                <input
                  {...register('job_title', {
                    required: 'Job title is required',
                  })}
                  placeholder='e.g. Senior React Developer'
                  className='input input-bordered w-full'
                />
                {errors.job_title && (
                  <p className='text-red-500 text-sm'>
                    {errors.job_title.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className='font-semibold'>Email Address</label>
                <input
                  {...register('email')}
                  disabled
                  className='input input-bordered w-full bg-gray-100'
                />
              </div>

              {/* Category */}
              <div>
                <label className='font-semibold'>Category</label>
                <select
                  {...register('category')}
                  className='select select-bordered w-full'
                >
                  <option value='Web Development'>Web Development</option>
                  <option value='Graphics Design'>Graphics Design</option>
                  <option value='Digital Marketing'>Digital Marketing</option>
                </select>
              </div>

              {/* Deadline (Controller Required) */}
              <div>
                <label className='font-semibold flex'>Deadline</label>
                <Controller
                  control={control}
                  name='deadline'
                  rules={{ required: 'Deadline is required' }}
                  render={({ field }) => (
                    <DatePicker
                      className='input input-bordered w-full'
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.deadline && (
                  <p className='text-red-500 text-sm'>
                    {errors.deadline.message}
                  </p>
                )}
              </div>

              {/* Min Price */}
              <div>
                <label className='font-semibold'>Minimum Price ($)</label>
                <input
                  type='number'
                  {...register('min_price', {
                    required: 'Minimum price is required',
                  })}
                  className='input input-bordered w-full'
                />
                {errors.min_price && (
                  <p className='text-red-500 text-sm'>
                    {errors.min_price.message}
                  </p>
                )}
              </div>

              {/* Max Price */}
              <div>
                <label className='font-semibold'>Maximum Price ($)</label>
                <input
                  type='number'
                  {...register('max_price', {
                    required: 'Maximum price is required',
                    validate: (value) =>
                      parseFloat(value) >= parseFloat(minPrice) ||
                      'Max price must be greater than Min price',
                  })}
                  className='input input-bordered w-full'
                />
                {errors.max_price && (
                  <p className='text-red-500 text-sm'>
                    {errors.max_price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className='mt-6'>
              <label className='font-semibold'>Job Description</label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                className='textarea textarea-bordered h-32 w-full'
                placeholder='Describe the job requirements...'
              />
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className='mt-8 text-right'>
              <button
                type='submit'
                disabled={isPending}
                className='btn btn-info text-white font-bold'
              >
                {isPending ? (
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
