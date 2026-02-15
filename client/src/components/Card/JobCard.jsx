import { Link } from 'react-router';

const JobCard = () => {
  return (
    <Link
      to={`/job/1`}
      className='group w-full max-w-sm p-6 bg-base-300 border border-secondary-content rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between'
    >
      <div>
        {/* Top Section: Category & Deadline */}
        <div className='flex items-center justify-between mb-4'>
          <span className='px-3 py-1 text-[10px] font-bold tracking-wider text-accent uppercase bg-primary-content rounded-lg'>
            Web Development
          </span>
          <span className='text-xs font-medium text-accent'>
            Ends: 28 May
          </span>
        </div>

        {/* Content Section */}
        <h1 className='text-xl font-bold text-primary group-hover:text-secondary transition-colors'>
          E-commerce Website Development
        </h1>

        <p className='mt-3 text-sm leading-relaxed text-gray-500 line-clamp-3'>
          Dramatically redefine bleeding-edge infrastructures after
          client-focused value. Intrinsicly seize user-centric partnerships
          through out-of-the-box architectures.
        </p>
      </div>

      {/* Footer Section: Price & Stats */}
      <div className='mt-6 pt-4 border-t border-gray-50 flex items-center justify-between'>
        <div>
          <p className='text-xs text-gray-400 uppercase font-semibold tracking-tight'>
            Budget
          </p>
          <p className='text-lg font-bold text-gray-900'>$500 - $600</p>
        </div>

        <div className='text-right'>
          <p className='text-xs text-gray-400 uppercase font-semibold tracking-tight'>
            Bids
          </p>
          <div className='flex items-center justify-end gap-1'>
            <span className='h-2 w-2 rounded-full bg-green-500 animate-pulse'></span>
            <p className='text-sm font-bold text-gray-700'>12 active</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
