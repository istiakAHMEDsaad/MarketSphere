import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const JobCardDetails = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='flex flex-col lg:flex-row justify-center gap-8 items-start min-h-[calc(100vh-306px)] max-w-7xl mx-auto py-12 px-4'>
      {/* Left Side: Job Details */}
      <div className='flex-1 w-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-semibold tracking-widest text-gray-400 uppercase'>
            Deadline: 28/05/2024
          </span>
          <span className='px-4 py-1.5 text-xs font-bold text-info uppercase bg-blue-50 rounded-full border border-blue-100'>
            Web Development
          </span>
        </div>

        <div className='mt-6'>
          <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
            E-commerce Website Development
          </h1>

          <p className='mt-6 text-lg leading-relaxed text-gray-600'>
            Dramatically redefine bleeding-edge infrastructures after
            client-focused value. Intrinsicly seize user-centric partnerships
            through out-of-the-box architectures.
          </p>

          <div className='mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100'>
            <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-4'>
              Buyer Details
            </h3>
            <div className='flex items-center gap-4'>
              <img
                className='rounded-full object-cover w-14 h-14 border-2 border-white shadow-sm'
                src='https://i.ibb.co.com/qsfs2TW/Ix-I18-R8-Y-400x400.jpg'
                alt='avatar'
              />
              <div>
                <p className='text-md font-bold text-gray-800'>
                  Programming-Hero Instructors
                </p>
                <p className='text-sm text-gray-500'>
                  instructors@programming-hero.com
                </p>
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <span className='text-sm font-medium text-gray-500 block mb-1'>
              Project Budget Range
            </span>
            <p className='text-3xl font-bold text-info'>$500 - $600</p>
          </div>
        </div>
      </div>

      {/* Right Side: Place A Bid Form */}
      <section className='w-full lg:max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-xl'>
        <h2 className='text-2xl font-bold text-gray-800'>Place A Bid</h2>
        <p className='text-sm text-gray-500 mt-1 mb-8'>
          Submit your best proposal for this project.
        </p>

        <form className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1'>
            <div>
              <label
                className='text-sm font-semibold text-gray-700 ml-1'
                htmlFor='price'
              >
                Your Price ($)
              </label>
              <input
                id='price'
                type='number'
                placeholder='e.g. 550'
                className='block w-full px-4 py-3 mt-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-info focus:bg-white focus:outline-none transition-all'
              />
            </div>

            <div>
              <label
                className='text-sm font-semibold text-gray-700 ml-1'
                htmlFor='emailAddress'
              >
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                disabled
                placeholder='user@example.com'
                className='block w-full px-4 py-3 mt-2 text-gray-400 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed'
              />
            </div>
          </div>

          <div>
            <label
              className='text-sm font-semibold text-gray-700 ml-1'
              htmlFor='comment'
            >
              Proposal Note
            </label>
            <textarea
              id='comment'
              rows='3'
              placeholder='Describe your experience with similar projects...'
              className='block w-full px-4 py-3 mt-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-info focus:bg-white focus:outline-none transition-all'
            ></textarea>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700 ml-1'>
              Expected Delivery Date
            </label>
            <DatePicker
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-info transition-all cursor-pointer'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <button
            type='submit'
            className='w-full py-4 text-sm font-bold tracking-wide text-white capitalize transition-all duration-300 transform bg-info rounded-xl shadow-lg shadow-blue-200'
          >
            Submit Proposal
          </button>
        </form>
      </section>
    </div>
  );
};

export default JobCardDetails;
