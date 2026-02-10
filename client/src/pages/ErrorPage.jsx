import { Link } from 'react-router';
import errorPage from '../assets/illustration.svg';
import { ArrowLeft, HomeIcon } from 'lucide-react';

const ErrorPage = () => {
  return (
    <section class='bg-base-100 '>
      <div class='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
        <div class='wf-ull lg:w-1/2'>
          <p class='text-sm font-medium text-error'>404 error</p>
          <h1 class='mt-3 text-2xl font-semibold md:text-3xl'>
            Page not found
          </h1>
          <p class='mt-4 text-secondary'>
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

          <div class='flex items-center mt-6 gap-x-3'>
            <Link to={-1} class='btn btn-neutral'>
              <ArrowLeft size={18} />
              <span>Go back</span>
            </Link>

            <Link to='/' class='btn btn-info'>
              <HomeIcon size={18} />
              Take me home
            </Link>
          </div>
        </div>

        <div class='relative w-full mt-12 lg:w-1/2 lg:mt-0'>
          <img class='w-full max-w-lg lg:mx-auto' src={errorPage} alt='' />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
