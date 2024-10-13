import React from 'react';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerHeader: 'relative w-full h-48 xl:h-64 bg-header bg-cover bg-bottom bg-no-repeat',
        headerContent: 'w-full h-48 px-4 md:px-6 lg:px-8 2xl:px-16 flex flex-col justify-center items-center',
        title: 'mt-2 2xl:mt-8 text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-oswald font-bold text-slate-400 z-10',
        subtitle: 'mt-2 text-center text-sm md:text-base lg:text-lg font-inter font-medium text-slate-500 z-10',
        gradient: 'absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-0'
    }
});

const { containerHeader, headerContent, title, subtitle, gradient } = card();

function Header() {
    return (
        <div className={containerHeader()}>
            <div className={headerContent()}>
                <h1 className={title()}>
                    Emissora Top
                </h1>
                <h2 className={subtitle()}>
                    Aqui você encontra os melhores programas de TV para compor o seu dia a dia!
                </h2>
            </div>
            <div className={gradient()}/>
        </div>
    )
}

export default Header;