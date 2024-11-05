import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import tokenService from '../../services/tokenService';

const card = tv({
  slots: {
    containerMain: 'fixed flex justify-between items-center w-full px-4 py-4 md:px-6 lg:px-8 2xl:px-16 bg-transparent z-50',
    icon: 'w-8 h-8 lg:w-10 lg:h-10 text-white cursor-pointer',
    button: 'flex flex-row items-center justify-center px-4 py-1 bg-slate-600 hover:bg-slate-500 transition-all duration-300 rounded-md',
    buttonText: 'text-base lg:text-lg text-white font-inter font-semibold'
  }
});

const { containerMain, icon, button, buttonText } = card();

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
      const { status } = await tokenService.validateTokenRoute();

      if (status === 200) setHasToken(true);
      else setHasToken(false);
  };

  return (
    <>
      <div className={containerMain()}>
        <Menu onClick={() => setShowSidebar(!showSidebar)} className={icon()} />
        
        { hasToken ? (
          <Link to={'/'} className={button()}>
            <h2 className={buttonText()}>Logout</h2>
          </Link>
        ) : (
          <Link to={'/user/login'} className={button()}>
            <h2 className={buttonText()}>Acessar</h2>
          </Link>
        )}
      </div>

      {showSidebar && (
        <Sidebar setShowSidebar={setShowSidebar} />
      )}
    </>
  )
}

export default Navbar;