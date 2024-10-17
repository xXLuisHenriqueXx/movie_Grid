import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='
        min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950
    '>
            <div className='
                flex flex-col items-center justify-center
                w-full h-screen
            '>
                <h1 className='
                    text-9xl font-oswald font-bold text-white text-center
                '>404</h1>
                <h1 className='
                    text-base font-inter font-normal text-white text-center pt-4
                '>Ops, parece que a paǵina que você tentou acessar não existe no nosso sistema</h1>
                
                <Link to='/streaming' className='
                bg-slate-800 hover:bg-slate-700 transition-all duration-300 rounded-md px-4 py-2
                    text-center text-white font-oswald font-bold text-lg mt-4
                '>Voltar para a Home</Link>
            </div>
        </div>
    )
}

export default NotFound;