import Footer from '../components/Common/Footer';
import Navbar from '../components/Common/Navbar';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div className='font-poppins'>
      <Navbar />
      <div className='min-h-[calc(100vh-124px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
