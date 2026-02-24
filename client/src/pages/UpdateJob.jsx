import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import useJobDetails from '../hooks/dataHooks/useJobDetails';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../utils/axiosInstance';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: job, isLoading, isError } = useJobDetails(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const minPrice = watch('min_price');

  useEffect(() => {
    if (job) {
      reset({
        job_title: job.title,
        email: job?.buyer?.email,
        category: job.category,
        deadline: job.deadline ? new Date(job.deadline) : null,
        min_price: job.min_price,
        max_price: job.max_price,
        description: job.description,
      });
    }
  }, [job, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.patch(`/jobs/job/${id}`, formData);
      return data;
    },

    onSuccess: () => {
      toast.success('Job updated successfully');
      queryClient.invalidateQueries({ queryKey: ['myJobs', user?.email] });
      queryClient.invalidateQueries({ queryKey: ['allJobs'] });
      navigate('/my-posted-jobs');
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || 'Update failed');
    },
  });

  const onSubmit = (data) => {
    const updatedJob = {
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
    };

    mutate(updatedJob);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return toast.error('Failed to fetch job');

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className='p-6 bg-white rounded-md shadow-md w-full max-w-3xl'>
        <h2 className='text-xl font-semibold mb-6'>Update Job</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Job Title */}
            <div>
              <label className='font-semibold'>Job Title</label>
              <input
                {...register('job_title', {
                  required: 'Title is required',
                })}
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
              <label className='font-semibold'>Email</label>
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

            {/* Deadline */}
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
              <label className='font-semibold'>Minimum Price</label>
              <input
                type='number'
                {...register('min_price', {
                  required: 'Minimum price required',
                })}
                className='input input-bordered w-full'
              />
            </div>

            {/* Max Price */}
            <div>
              <label className='font-semibold'>Maximum Price</label>
              <input
                type='number'
                {...register('max_price', {
                  required: 'Maximum price required',
                  validate: (value) =>
                    parseFloat(value) >= parseFloat(minPrice) ||
                    'Max must be greater than Min',
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
            <label className='font-semibold'>Description</label>
            <textarea
              {...register('description', {
                required: 'Description required',
              })}
              className='textarea textarea-bordered w-full h-32'
            />
            {errors.description && (
              <p className='text-red-500 text-sm'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='text-right mt-8'>
            <button
              type='submit'
              disabled={isPending}
              className='btn btn-primary'
            >
              {isPending ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
