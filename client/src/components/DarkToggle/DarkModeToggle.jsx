import { Sun, MoonStar } from 'lucide-react';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem('theme') === 'dim'
  );

  useEffect(() => {
    const theme = dark ? 'dim' : 'caramellatte';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(prev => !prev)}
      className='btn btn-ghost btn-sm'
    >
      {dark ? <MoonStar size={22} /> : <Sun size={22} />}
    </button>
  );
};

export default DarkModeToggle;
