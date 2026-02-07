import { Link, useLocation } from 'react-router';
import DarkModeToggle from '../DarkToggle/DarkModeToggle';

const Navbar = () => {
  const location = useLocation();

  const navText = [
    { title: 'Home', link: '/' },
    { title: 'All Jobs', link: '/all-jobs' },
    { title: 'Login', link: '/login' },
  ];

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to={'/'} className='btn btn-ghost text-xl'>
          Market Sphere
        </Link>
      </div>

      {/* medium devices */}
      <div className='flex flex-row items-center pr-2'>
        <div className='hidden md:flex'>
          <ul className='menu menu-horizontal px-1'>
            {navText.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className={`btn ${location.pathname === item.link ? 'btn-neutral' : 'btn-ghost'}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <DarkModeToggle />
      </div>

      {/* small devices */}
      <div className='md:hidden dropdown dropdown-end'>
        <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
          {/* hamburger icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {' '}
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h8m-8 6h16'
            />{' '}
          </svg>
        </div>
        <ul
          tabIndex='-1'
          className='dropdown-content menu menu-sm bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow-sm'
        >
          <li>
            {navText.map((item) => (
              <Link key={item.link} to={item.link} className='btn btn-ghost'>
                {item.title}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
