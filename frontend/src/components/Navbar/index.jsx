import React from 'react';

import IconTv from '../../assets/icon_tv.png';
import { Menu } from 'lucide-react';

function Navbar() {
  return (
    <div className='
        fixed bg-transparent
        w-full h-16 px-4 py-2 md:px-6 lg:px-8
        flex justify-between items-center
    '>
        <img src={IconTv} alt='Ícone de TV' className='w-8 h-8' />
        <Menu className='w-8 h-8 text-white' />
    </div>
  )
}

export default Navbar;