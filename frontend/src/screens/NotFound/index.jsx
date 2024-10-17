import React from 'react';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950',
        containerNotFound: 'flex flex-col items-center justify-center w-full h-screen',
        title: 'text-9xl font-oswald font-bold text-white text-center',
        subtitle: 'text-base font-inter font-normal text-white text-center pt-4',
        button: 'px-4 py-2 mt-4 bg-slate-800 hover:bg-slate-700 transition-all duration-300 rounded-md text-center text-white font-oswald font-bold text-lg'
    }
});

const { containerMain, containerNotFound, title, subtitle, button } = card();

function NotFound() {
    return (
        <div className={containerMain()}>
            <div className={containerNotFound()}>
                <h1 className={title()}>404</h1>
                <h1 className={subtitle()}>Ops, parece que a paǵina que você tentou acessar não existe no nosso sistema</h1>
                
                <Link to='/streaming' className={button()}>Voltar para a Home</Link>
            </div>
        </div>
    )
}

export default NotFound;