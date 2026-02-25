import { useMemo, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import JobCard from '../components/Card/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useAllJobs from '../hooks/dataHooks/useAllJobs';

const ITEMS_PER_PAGE = 6;

const AllJobs = () => {
  const { data: jobs = [], isLoading, isError } = useAllJobs();

  // ================= STATE =================
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ================= DEBOUNCE =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    toast.error('Failed to fetch the data!');
  }

  // ================= FILTER + SORT =================
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (job) => job.category === category
      );
    }

    // Search by title
    if (debouncedSearch) {
      filtered = filtered.filter((job) =>
        job.title
          ?.toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      );
    }

    // Sort by deadline
    if (sortOrder === 'asc') {
      filtered.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    } else if (sortOrder === 'dsc') {
      filtered.sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );
    }

    return filtered;
  }, [jobs, category, debouncedSearch, sortOrder]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ================= RESET =================
  const handleReset = () => {
    setCategory('');
    setSortOrder('');
    setSearch('');
    setCurrentPage(1);
  };

  return (
    <div className='container px-6 py-12 mx-auto min-h-[calc(100vh-124px)]'>

      {/* Header */}
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-semibold text-info lg:text-4xl'>
          Explore All Jobs
        </h1>
        <p className='max-w-2xl mx-auto mt-4 text-base'>
          Find your next career move.
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-4'>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='select select-bordered w-full md:w-auto'
        >
          <option value=''>Filter By Category</option>
          <option value='Web Development'>Web Development</option>
          <option value='Graphics Design'>Graphics Design</option>
          <option value='Digital Marketing'>Digital Marketing</option>
        </select>

        {/* Search */}
        <input
          type='text'
          placeholder='Search jobs...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input input-bordered w-full md:w-1/3'
        />

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className='select select-bordered w-full md:w-auto'
        >
          <option value=''>Sort By Deadline</option>
          <option value='dsc'>Newest First</option>
          <option value='asc'>Oldest First</option>
        </select>

        {/* Reset */}
        <button
          onClick={handleReset}
          className='btn btn-outline btn-error'
        >
          Reset
        </button>
      </div>

      {/* JOB GRID */}
      <div className='grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p className='text-center col-span-full text-gray-500'>
            No jobs found.
          </p>
        )}
      </div>

      {/* PAGINATION (DaisyUI) */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-12'>
          <div className='join'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`join-item btn ${
                  currentPage === index + 1
                    ? 'btn-active'
                    : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;