import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'flex justify-center items-center min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950',
        containerLogin: 'flex flex-col justify-center items-center w-full md:w-3/5 lg:w-1/2 xl:w-2/5 h-full px-4',
        title: 'mb-2 text-4xl text-center font-oswald font-bold text-white',
        description: 'mb-8 text-lg text-center font-inter text-slate-400',
        form: 'flex flex-col justify-center items-center w-full',
        spanInput: 'flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-800 text-white rounded-md',
        icon: 'w-6 h-6 text-white',
        input: 'w-full h-full bg-transparent text-white ml-2 focus:outline-none',
        button: 'relative w-full h-12 px-4 bg-blue-500 rounded-md hover:bg-blue-700 transition-all duration-200',
        buttonText: 'text-lg font-bold text-slate-900',
        buttonIcon: 'w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-4'
    }
});

const { containerMain, containerLogin, title, description, form, spanInput, icon, input, button, buttonText, buttonIcon } = card();

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const typeInputPassword = showPassword ? 'text' : 'password';

    return (
        <div className={containerMain()}>
            <div className={containerLogin()}>
                <h1 className={title()}>
                    Bem vindo(a) de volta!
                </h1>
                <p className={description()}>
                    Realize o login para acessar as funcionalidade.
                </p>

                <form className={form()}>
                    <span className={spanInput()}>
                        <User className={icon()} />
                        <input type='text' placeholder='Username' className={input()}/>
                    </span>

                    <span className={spanInput()}>
                        <Lock className={icon()} />
                        <input type={typeInputPassword} placeholder='Senha' className={input()} />
                        <button onClick={() => setShowPassword(!showPassword)} type='button'>
                            {showPassword 
                                ? <EyeOff className={icon()} />
                                : <Eye className={icon()} />
                            }
                        </button>
                    </span>

                    <button type='submit' className={button()}>
                        <span className={buttonText()}>Login</span>
                        <ArrowRight className={buttonIcon()} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;