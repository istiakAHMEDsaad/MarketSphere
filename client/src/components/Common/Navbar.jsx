import { Link, useLocation } from 'react-router';
import DarkModeToggle from '../DarkToggle/DarkModeToggle';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AppContext);

  const navText = [
    { title: 'Home', link: '/' },
    { title: 'All Jobs', link: '/jobs' },
  ];

  return (
    <div className='navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-10'>
      <div className='flex-1'>
        <Link to={'/'} className='btn btn-ghost text-xl font-bold'>
          Market Sphere
        </Link>
      </div>

      <div className='flex-none flex items-center gap-2'>
        {/* Desktop Menu */}
        <div className='hidden md:flex items-center'>
          <ul className='menu menu-horizontal px-1 gap-2'>
            {navText.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className={`btn btn-sm ${
                    location.pathname === item.link
                      ? 'btn-neutral'
                      : 'btn-ghost'
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {user && (
              <li className='flex items-center justify-center'>
                Hi | {user?.displayName.slice(0, 7)}
                {user?.displayName.length > 7 ? '...' : ''}
              </li>
            )}
          </ul>

          {/* User Profile / Login (Desktop) */}
          {!user ? (
            <Link className='btn btn-ghost btn-sm' to='/login'>
              Login
            </Link>
          ) : (
            <div className='dropdown dropdown-end ml-4'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full ring ring-info ring-offset-base-100 ring-offset-2'>
                  <img src={user?.photoURL} alt='User Profile' />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li className=''>
                  <Link to='/add-job'>Add Job</Link>
                  <Link to='/my-posted-jobs'>My Posted Job</Link>
                  <Link to='/my-bids'>My Bids</Link>
                  <Link to='/bid-requests'>Bid Request</Link>
                  <button
                    onClick={logout}
                    className='btn btn-ghost text-red-500'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <DarkModeToggle />

        {/* Mobile Dropdown */}
        <div className='md:hidden dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-40'
          >
            <p className='flex items-center justify-center text-xl'>
              Hi | {user?.displayName.slice(0, 7)}
              {user?.displayName.length > 7 ? '...' : ''}
            </p>

            {navText.map((item) => (
              <li key={item.link} className='my-1'>
                <Link className='' to={item.link}>
                  {item.title}
                </Link>
              </li>
            ))}
            {!user ? (
              <li>
                <Link to='/login'>Login</Link>
              </li>
            ) : (
              <li>
                <Link to='/add-job'>Add Job</Link>
                <Link to='/my-posted-jobs'>My Posted Job</Link>
                <Link to='/my-bids'>My Bids</Link>
                <Link to='/bid-requests'>Bid Request</Link>
                <div className='divider my-0'></div>
                <button className='btn btn-soft btn-error' onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
