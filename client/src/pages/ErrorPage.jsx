import { Link } from 'react-router';
import errorPage from '../assets/illustration.svg';
import { ArrowLeft, HomeIcon } from 'lucide-react';

const ErrorPage = () => {
  return (
    <section className='bg-base-100 '>
      <div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
        <div className='wf-ull lg:w-1/2'>
          <p className='text-sm font-medium text-error'>404 error</p>
          <h1 className='mt-3 text-2xl font-semibold md:text-3xl'>
            Page not found
          </h1>
          <p className='mt-4 text-secondary'>
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

          <div className='flex items-center mt-6 gap-x-3'>
            <Link to={-1} className='btn btn-neutral'>
              <ArrowLeft size={18} />
              <span>Go back</span>
            </Link>

            <Link to='/' className='btn btn-info'>
              <HomeIcon size={18} />
              Take me home
            </Link>
          </div>
        </div>

        <div className='relative w-full mt-12 lg:w-1/2 lg:mt-0'>
          <img className='w-full max-w-lg lg:mx-auto' src={errorPage} alt='' />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
