import React from 'react';
import IconTv from '../../assets/icon_tv.png';
import { Menu } from 'lucide-react';
import { tv } from 'tailwind-variants';

const card = tv({
  slots: {
    containerMain: 'fixed flex justify-between items-center w-full px-4 py-4 md:px-6 lg:px-8 bg-transparent z-50',
    image: 'w-8 h-8 lg:w-10 lg:h-10',
    icon: 'w-8 h-8 lg:w-10 lg:h-10 text-white'
  }
});

const { containerMain, image, icon } = card();

function Navbar() {
  return (
    <div className={containerMain()}>
        <img src={IconTv} alt='Ícone de TV' className={image()} />
        <Menu className={icon()} />
    </div>
  )
}

export default Navbar;