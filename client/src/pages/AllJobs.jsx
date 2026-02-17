import { useEffect, useState } from 'react';
import JobCard from '../components/Card/JobCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllJobs = () => {
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs/jobs`,
        );
        if (data.success) {
          setJobs(data.jobs);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchJobs();
  }, []);

  console.log(jobs);

  return (
    <div className='container px-6 py-12 mx-auto min-h-[calc(100vh-124px)] flex flex-col justify-between'>
      <div>
        {/* Header Section */}
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-semibold text-info capitalize lg:text-4xl'>
            Explore All Jobs
          </h1>
          <p className='max-w-2xl mx-auto mt-4 text-base'>
            Find your next career move by filtering through categories or
            searching for specific roles.
          </p>
        </div>

        {/* Filter Section - Glassmorphism Style */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
          {/* Category Filter */}
          <div className='w-full md:w-auto'>
            <select
              name='category'
              id='category'
              className='w-full border-gray-200 focus:ring-blue-500 focus:border-blue-500 p-3.5 rounded-xl bg-white shadow-sm transition-all outline-none text-gray-600'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          {/* Search Bar */}
          <form className='w-full md:w-1/3'>
            <div className='flex p-1.5 overflow-hidden border border-gray-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-400/20 focus-within:border-blue-400 transition-all shadow-sm'>
              <input
                className='px-4 py-2 text-gray-700 placeholder-gray-400 bg-white outline-none w-full'
                type='text'
                name='search'
                placeholder='Search jobs...'
                aria-label='Search jobs'
              />
              <button className='px-6 py-2 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none'>
                Search
              </button>
            </div>
          </form>

          {/* Sort By Deadline */}
          <div className='w-full md:w-auto'>
            <select
              name='sort'
              id='sort'
              className='w-full border-gray-200 focus:ring-blue-500 focus:border-blue-500 p-3.5 rounded-xl bg-white shadow-sm transition-all outline-none text-gray-600'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Newest First</option>
              <option value='asc'>Oldest First</option>
            </select>
          </div>

          {/* Reset Button */}
          <button className='w-full md:w-auto px-8 py-3.5 font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-500 transition-all active:scale-95 shadow-sm'>
            Reset Filters
          </button>
        </div>

        {/* Jobs Grid */}
        <div className='grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {jobs?.map((job) => (
            <div
              key={job._id}
              className='hover:translate-y-[-5px] transition-transform duration-300'
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Placeholder (Optional but looks professional) */}
      <div className='flex justify-center mt-12'>
        {/* You can add a pagination component here later */}
      </div>
    </div>
  );
};

export default AllJobs;
