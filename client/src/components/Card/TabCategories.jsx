import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import JobCard from './JobCard';

const TabCategories = () => {
  return (
    <div className='container px-6 py-10 mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold text-info capitalize lg:text-4xl'>
          Browse Jobs By Category
        </h1>
        <div className='w-20 h-1 bg-info mx-auto mt-4 rounded-full'></div>
        <p className='max-w-2xl mx-auto mt-6 text-base-content/70'>
          Discover your next career move across our top sectors. Select a
          category to filter the current openings.
        </p>
      </div>

      <Tabs>
        <div className='flex items-center justify-center mb-12'>
          <TabList className='tabs tabs-boxed bg-base-200 p-2 rounded-xl'>
            <Tab
              className='tab text-lg transition-all duration-300 rounded-md'
              selectedClassName='tab-active !bg-info !text-info-content'
            >
              Web Development
            </Tab>
            <Tab
              className='tab text-lg transition-all duration-300'
              selectedClassName='tab-active !bg-info !text-info-content rounded-md'
            >
              Graphics Design
            </Tab>
            <Tab
              className='tab text-lg transition-all duration-300'
              selectedClassName='tab-active !bg-info !text-info-content rounded-md'
            >
              Digital Marketing
            </Tab>
          </TabList>
        </div>

        {/* Animation Wrapper */}
        <div className='min-h-100'>
          <TabPanel className='animate-in fade-in duration-500'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              <JobCard /> <JobCard /> <JobCard /> <JobCard />
            </div>
          </TabPanel>

          <TabPanel className='animate-in fade-in duration-500'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              <JobCard /> <JobCard />
            </div>
          </TabPanel>

          <TabPanel className='animate-in fade-in duration-500'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              <JobCard /> <JobCard /> <JobCard />
              <JobCard /> <JobCard /> <JobCard />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCategories;
