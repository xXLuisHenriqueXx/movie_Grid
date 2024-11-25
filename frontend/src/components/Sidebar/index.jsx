import React, { useEffect, useState } from 'react';
import { Airplay, LogIn, LogOut, TvMinimal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import tokenService from '../../services/tokenService';

const card = tv({
    slots: {
        containerMain: 'fixed w-full h-screen bg-slate-950 bg-opacity-90 z-50',
        containerSidebar: 'flex flex-col w-[21.5rem] h-screen bg-slate-900 z-[99]',
        containerTitle: 'flex flex-col items-center justify-center w-full h-20 border-b border-slate-800',
        containerButtons: 'flex flex-col items-center justify-center w-full h-full',
        title: 'text-lg font-semibold text-white',
        button: 'relative flex items-center justify-center w-[20rem] h-14 mt-4 border-2 border-slate-800 rounded-md hover:bg-slate-800',
        icon: 'absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white',
        text: 'text-lg font-semibold text-white'
    }
});

const { containerMain, containerSidebar, containerTitle, containerButtons, title, button, icon, text } = card();

function Sidebar({ setShowSidebar }) {
    const [hasUserToken, setHasUserToken] = useState(false);

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        const { status, isAdmin } = await tokenService.validateTokenRoute();

        if (status === 200 && !isAdmin) setHasUserToken(true);
        else setHasUserToken(false);
    };

    return (
        <div onClick={() => setShowSidebar(false)} className={containerMain()}>
            <div onClick={(e) => e.stopPropagation()} className={containerSidebar()}>
                <div className={containerTitle()}>
                    <h1 className={title()}>Olá, tudo bem?</h1>
                </div>

                <div className={containerButtons()}>
                    {!hasUserToken && (
                        <Link to={'/user/login'} className={button()}>
                            <LogIn className={icon()} />
                            <span className={text()}>Acessar</span>
                        </Link>
                    )}

                    <Link to={'/'} className={button()}>
                        <TvMinimal className={icon()} />
                        <span className={text()}>Home</span>
                    </Link>

                    <Link to={'/streaming'} className={button()}>
                        <Airplay className={icon()} />
                        <span className={text()}>Streaming</span>
                    </Link>

                    {hasUserToken && (
                        <Link to={'logout'} className={button()}>
                            <LogOut className={icon()} />
                            <span className={text()}>Desconectar</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;