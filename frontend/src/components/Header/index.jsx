import React from 'react';

function Header() {
    return (
        <div className='
        w-full h-48 px-4 md:px-6 lg:px-8
        flex flex-col justify-center items-center
    '>
            <h1 className='
                mt-2
                text-3xl font-oswald font-bold text-slate-400
                md:text-4xl lg:text-5xl
            '>
                Emissora Top
            </h1>
            <h2 className='
                mt-2 text-center
                text-sm font-inter font-medium text-slate-500
                md:text-base lg:text-lg
            '>
                Aqui você encontra os melhores programas de TV para compor o seu dia a dia!
            </h2>
        </div>
    )
}

export default Header;