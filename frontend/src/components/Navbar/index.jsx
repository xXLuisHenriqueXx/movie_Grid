import React from 'react';
import { Menu } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { Link } from 'react-router-dom';

const card = tv({
  slots: {
    containerMain: 'fixed flex justify-between items-center w-full px-4 py-4 md:px-6 lg:px-8 2xl:px-16 bg-transparent z-50',
    icon: 'w-8 h-8 lg:w-10 lg:h-10 text-white'
  }
});

const { containerMain, icon } = card();

function Navbar() {
  return (
    <div className={containerMain()}>
        <Menu className={icon()} />
        <Link to={'/user/login'} className='
            flex flex-row items-center justify-center bg-slate-600 hover:bg-slate-500 transition-all duration-300 rounded-md px-4 py-1
            text-base lg:text-lg text-center text-white font-oswald font-bold
        '>
            Acessar
        </Link>
    </div>
  )
}

export default Navbar;