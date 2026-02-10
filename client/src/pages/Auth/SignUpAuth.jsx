import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useNavigate, Link } from 'react-router';

const SignUpAuth = () => {
  const { setUser, signInWithGoogle, updateUserProfile, createUser, loading } =
    useContext(AppContext);
  const [showPass, setShowPass] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);
  const navigate = useNavigate();

  // google signin
  const handleLogin = async () => {
    try {
      await signInWithGoogle();

      toast.success('Signin Successful 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // register
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmpassword.value;

    if (!name || !photo || !email || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }

    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordValidation.test(password)) {
      return toast.error(
        'Password must be 8+ chars, include uppercase, lowercase, number & symbol',
      );
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (!isValidUrl(photo)) {
      return toast.error('Invalid image URL');
    }

    try {
      const account = await createUser(email, password);

      await updateUserProfile(name, photo);

      setUser({
        ...account.user,
        displayName: name,
        photoURL: photo,
      });

      toast.success('Signup Successful 🎉');

      form.reset();
      navigate('/login');
    } catch (error) {
      // Firebase error mapping
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('Email already exists');
          break;
        case 'auth/invalid-email':
          toast.error('Invalid email format');
          break;
        case 'auth/weak-password':
          toast.error('Weak password');
          break;
        default:
          toast.error('Signup failed');
      }
    }
  };

  return (
    <div className='flex h-full w-full my-10'>
      <div className='w-full hidden md:inline-block'>
        <img
          className='h-full rounded-xl'
          src='https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='leftSideImage'
        />
      </div>

      <div className='w-full flex flex-col items-center justify-center'>
        <form
          onSubmit={handleRegister}
          className='md:w-96 w-80 flex flex-col items-center justify-center'
        >
          <h2 className='text-4xl text-base-content font-medium'>Sign up</h2>
          <p className='text-sm text-gray-500/90 mt-3'>
            Sign up to create an account!
          </p>

          {/* google login */}
          <button
            onClick={handleLogin}
            type='button'
            className='w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full'
          >
            <img
              src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg'
              alt='googleLogo'
            />
          </button>

          <div className='flex items-center gap-4 w-full my-5'>
            <div className='w-full h-px bg-gray-300/90'></div>
            <p className='w-full text-nowrap text-sm text-gray-500/90'>
              or sign in with email
            </p>
            <div className='w-full h-px bg-gray-300/90'></div>
          </div>

          {/* name */}
          <div className='flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>

            <input
              type='text'
              name='name'
              placeholder='User Name'
              className='bg-transparent text-gray-200 placeholder-gray-500/80 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* photo url */}
          <div className='flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'
              />
            </svg>

            <input
              type='text'
              name='photo'
              placeholder='Image Url'
              className='bg-transparent text-gray-200 placeholder-gray-500/80 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* email */}
          <div className='flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
              />
            </svg>

            <input
              type='email'
              name='email'
              placeholder='Email id'
              className='bg-transparent text-gray-200 placeholder-gray-500/80 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* password */}
          <div className='flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 relative'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>

            <input
              type={showPass ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              className='bg-transparent text-gray-200 placeholder-gray-500/80 outline-none text-sm w-full h-full'
              required
            />
            <button
              onClick={() => setShowPass((prev) => !prev)}
              className='absolute right-5'
              type='button'
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* confirm password */}
          <div className='flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 relative'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>

            <input
              type={showPassTwo ? 'text' : 'password'}
              name='confirmpassword'
              placeholder='Confirm Password'
              className='bg-transparent text-gray-200 placeholder-gray-500/80 outline-none text-sm w-full h-full'
              required
            />
            <button
              onClick={() => setShowPassTwo((prev) => !prev)}
              className='absolute right-5'
              type='button'
            >
              {showPassTwo ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className='w-full flex items-center justify-between mt-8 text-gray-500/80'>
            <div className='flex items-center gap-2'>
              <input className='h-5' type='checkbox' id='checkbox' />
              <label className='text-sm' htmlFor='checkbox'>
                Remember me
              </label>
            </div>
            <a className='text-sm underline' href='#'>
              Forgot password?
            </a>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity'
          >
            Sign up
          </button>
          <p className='text-gray-500/90 text-sm mt-4'>
            Don&apos;t have an account?{' '}
            <Link
              to='/login'
              className='text-indigo-400 hover:underline'
              href='#'
            >
              sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpAuth;
