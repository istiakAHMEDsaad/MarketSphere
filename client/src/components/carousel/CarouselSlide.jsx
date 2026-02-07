import PropTypes from 'prop-types';
import { Link } from 'react-router';

const CarouselSlide = ({ image, text }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-152 rounded-2xl'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='flex items-center justify-center w-full h-full bg-neutral-900/70 rounded-2xl'>
        <div className='text-center'>
          <h1 className='md:text-3xl text-2xl font-semibold text-base-300 lg:text-4xl'>
            {text}
          </h1>
          <br />
          <Link to='/add-job' className='btn btn-neutral'>
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

CarouselSlide.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CarouselSlide;
