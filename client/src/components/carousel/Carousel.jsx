import imageOne from '../../assets/carousel1.jpg';
import imageTwo from '../../assets/carousel2.jpg';
import imageThree from '../../assets/carousel3.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CarouselSlide from './CarouselSlide';

const slideInfo = [
  {
    image: imageOne,
    text: 'Negotiate out of the box testing procedures.',
  },
  {
    image: imageTwo,
    text: 'Interactively harness experiences rather.',
  },
  {
    image: imageThree,
    text: 'Efficiently leverage existing mission critical.',
  },
];

const Carousel = () => {
  return (
    <div className='container px-6 py-10 mx-auto rounded-md'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        {slideInfo.map((item) => (
          <SwiperSlide>
            <CarouselSlide image={item.image} text={item.text} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
