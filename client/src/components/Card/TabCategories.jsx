import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import axiosInstance from '../../utils/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';
import JobCard from './JobCard';

const TabCategories = () => {
  const fetchAllJob = async () => {
    const { data } = await axiosInstance.get('/jobs/jobs');
    return data.jobs;
  };

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allJobs'],
    queryFn: fetchAllJob,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    toast.error('Failed to fetch the data!');
  }

  return (
    <div className='container px-6 py-10 mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold text-accent capitalize lg:text-4xl'>
          Browse Jobs By Category
        </h1>
        <div className='w-20 h-1 bg-accent mx-auto mt-4 rounded-full'></div>
        <p className='max-w-2xl mx-auto mt-6 text-base-accent/70'>
          Discover your next career move across our top sectors. Select a
          category to filter the current openings.
        </p>
      </div>

      <Tabs>
        <div className='flex items-center justify-center mb-12'>
          <TabList className='tabs tabs-boxed bg-base-200 p-2 rounded-xl'>
            <Tab
              className='tab text-lg transition-all duration-300 rounded-md'
              selectedClassName='tab-active !bg-accent !text-accent-content'
            >
              Web Development
            </Tab>
            <Tab
              className='tab text-lg transition-all duration-300'
              selectedClassName='tab-active !bg-accent !text-accent-content rounded-md'
            >
              Graphics Design
            </Tab>
            <Tab
              className='tab text-lg transition-all duration-300'
              selectedClassName='tab-active !bg-accent !text-accent-content rounded-md'
            >
              Digital Marketing
            </Tab>
          </TabList>
        </div>

        {/* Animation Wrapper */}
        <div className='min-h-100'>
          {/* web development tab */}
          <TabPanel className='animate-in fade-in duration-500'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {jobs
                ?.filter((item) => item?.category === 'Web Development')
                .map((item) => (
                  <JobCard key={item._id} job={item} />
                ))}
            </div>
          </TabPanel>

          <TabPanel className='animate-in fade-in duration-500'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {jobs
                ?.filter((item) => item?.category === 'Graphics Design')
                .map((item) => (
                  <JobCard key={item._id} job={item} />
                ))}
            </div>
          </TabPanel>

          <TabPanel className='animate-in fade-in duration-500'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {jobs
                ?.filter((item) => item?.category === 'Digital Marketing')
                .map((item) => (
                  <JobCard key={item._id} job={item} />
                ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCategories;
