import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Pencil, User } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import userService from '../../services/userService';
import { loginSchema, registerSchema } from '../../schemas/validationSchemas';

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
        button: 'relative w-full h-12 px-4 rounded-md transition-all duration-200',
        buttonText: 'text-lg font-bold',
        buttonIcon: 'w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-4'
    },
    variants: {
        buttonColor: {
            primary: {
                button: 'bg-blue-500 hover:bg-blue-700',
                buttonText: 'text-slate-900'
            },
            secondary: {
                button: 'mt-4 border-2 border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white',
                buttonText: 'hover:text-white'
            }
        }
    }
});

const { containerMain, containerLogin, title, description, form, spanInput, icon, input, button, buttonText, buttonIcon } = card();

function UserLoginRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(showRegister ? registerSchema : loginSchema)
    });

    const navigateToHome = () => {
        navigation('/');    
    };

    const onSubmit = async (data) => {
        try {
            if (showRegister) {

                const {status} = await userService.register(data.username, data.password);

                if (status === 400) {
                    alert('Usuário já cadastrado');
                } else if (status === 201) {
                    alert('Usuário cadastrado com sucesso');

                    await userService.login(data.username, data.password);

                    navigateToHome();
                }
            } else {
                const {status} = await userService.login(data.username, data.password);

                if (status === 401) {
                    alert('Usuário ou senha inválidos');
                } else if (status === 200) {
                    alert('Usuário logado com sucesso');

                    navigateToHome();
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const typeInputPassword = showPassword ? 'text' : 'password';

    return (
        <div className={containerMain()}>
            <div className={containerLogin()}>
                <h1 className={title()}>
                    {showRegister ? 'Que bom te ver aqui!' : 'Bem vindo(a) de volta!'}
                </h1>
                <p className={description()}>
                    {showRegister ? 'Realize o cadastro para acessar as funcionalidades.' : 'Realize o login para acessar as funcionalidades.'}
                </p>

                <form className={form()} onSubmit={handleSubmit(onSubmit)}>
                    <span className={spanInput()}>
                        <Pencil className={icon()} />
                        <input type='text' placeholder='Usuário' className={input()} {...register('username')} />
                        {errors.username && <p>{errors.username.message}</p>}
                    </span>

                    <span className={spanInput()}>
                        <Lock className={icon()} />
                        <input type={typeInputPassword} placeholder='Senha' className={input()} {...register('password')} />
                        <button onClick={() => setShowPassword(!showPassword)} type='button'>
                            {showPassword
                                ? <EyeOff className={icon()} />
                                : <Eye className={icon()} />
                            }
                        </button>
                        {errors.password && <p>{errors.password.message}</p>}
                    </span>

                    <button type='submit' className={button({ buttonColor: 'primary' })}>
                        <span className={buttonText({ buttonColor: 'primary' })}>
                            {showRegister ? 'Cadastrar' : 'Acessar'}
                        </span>
                        <ArrowRight className={buttonIcon()} />
                    </button>

                    <button type='button' className={button({ buttonColor: 'secondary' })} onClick={() => setShowRegister(!showRegister)}>
                        <span className={buttonText({ buttonColor: 'secondary' })}>
                            {showRegister ? 'Já possui uma conta?' : 'Ainda não possui uma conta?'}
                        </span>
                        <ArrowRight className={buttonIcon()} />
                    </button>
                </form>
                
                <Link to='/streaming' className='w-full'>
                    <button className={button({ buttonColor: 'secondary' })}>
                        <span className={buttonText({ buttonColor: 'secondary' })}>Ir para a home</span>
                        <ArrowRight className={buttonIcon()} />
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default UserLoginRegister;