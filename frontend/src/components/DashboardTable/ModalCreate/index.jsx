import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { contentSchema } from '../../../schemas/validationSchemas';
import ContentService from '../../../services/contentService';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'fixed top-0 left-0 min-w-full min-h-full bg-slate-950 bg-opacity-90 z-[98]',
        containerModal: 'absolute bottom-0 left-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col p-4 md:px-6 lg:px-8 2xl:p-8 w-full md:w-[90%] lg:w-2/3 xl:w-3/5 2xl:w-2/5 h-3/4 xl:h-[90%] 2xl:h-[80%] overflow-auto bg-slate-900 rounded-t-3xl md:rounded-lg z-[99]',
        containerForm: 'w-full',
        containerInput: 'w-full mb-4 p-2 bg-gray-700 rounded-sm text-white focus:outline-none',
        containerDuration: 'flex space-x-2 mb-4',
        containerInputsDuration: 'w-full p-2 bg-gray-700 rounded-sm text-white focus:outline-none',
        title: 'text-lg font-bold text-center text-gray-200 mb-4',
        labelText: 'text-white text-sm',
        button: 'relative flex flex-row justify-center items-center w-full p-2 bg-blue-700 rounded-sm text-white hover:bg-blue-500',
        icon: 'absolute right-4'
    }
});

const { containerMain, containerModal, containerForm, containerInput, containerDuration, containerInputsDuration, title, labelText, button, icon } = card();

function ModalCreate({ setShowModal, type }) {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(contentSchema)
    });

    const onSubmit = async (data) => {
        try {
            if (type === 'Movie') {
                const { title, description, owner, durationHours, durationMinutes, ageRestriction, releaseYear } = data;

                const duration = (durationHours * 60) + durationMinutes;
                const ageRestrictionInt = parseInt(ageRestriction);
                const releaseYearInt = parseInt(releaseYear);

                const params = {
                    title,
                    description, 
                    owner, 
                    duration, 
                    ageRestriction: ageRestrictionInt, 
                    releaseYear: releaseYearInt, 
                    tag: null,
                    image: null
                }

                const { status } = await ContentService.createMovie(params.title, params.description, params.owner, params.duration, params.ageRestriction, params.releaseYear, params.tag, params.image);

                if (status === 201) {
                    alert('Filme criado com sucesso');
                    setShowModal(false);
                }
            } else if (type === 'TVShow') {
                const { title, description, owner, ageRestriction, releaseYear } = data;

                const ageRestrictionInt = parseInt(ageRestriction);
                const releaseYearInt = parseInt(releaseYear);

                const params = {
                    title,
                    description, 
                    owner,  
                    ageRestriction: ageRestrictionInt, 
                    releaseYear: releaseYearInt, 
                    tag: null,
                    image: null
                }

                console.log(params)

                const response = await ContentService.createTVShow(params.title, params.description, params.owner, params.ageRestriction, params.releaseYear, params.tag, params.image);

                console.log(response)

                if (response.status === 201) {
                    alert('Programa criado com sucesso');
                    setShowModal(false);
                }
            } else if (type === 'SoapOpera') {
                const { title, description, owner, ageRestriction, releaseYear } = data;

                const ageRestrictionInt = parseInt(ageRestriction);
                const releaseYearInt = parseInt(releaseYear);

                const params = {
                    title,
                    description, 
                    owner,  
                    ageRestriction: ageRestrictionInt, 
                    releaseYear: releaseYearInt,
                    tag: null,
                    image: null
                }

                const { status } = await ContentService.createSoapOpera(params.title, params.description, params.owner, params.ageRestriction, params.releaseYear, params.tag, params.image);

                if (status === 201) {
                    alert('Novela criada com sucesso');
                    setShowModal(false);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className={containerMain()} onClick={() => setShowModal(false)}>
            <div className={containerModal()} onClick={(e) => e.stopPropagation()}>
                <h1 className={title()}>
                    Adicionar
                    {type === 'Movie' && ' filme'}
                    {type === 'TVShow' && ' programa de TV'}
                    {type === 'SoapOpera' && ' novela'}
                </h1>
                <div className={containerForm()}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <span>
                            <label className={labelText()} htmlFor="title">Título</label>

                            <input className={containerInput()} type='text' placeholder='Título...' id='title' {...register('title')} />
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="description">Descrição</label>

                            <input className={containerInput()} type='text' placeholder='Descrição...' id='description' {...register('description')} />
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="owner">
                                {type === 'Movie' ? 'Diretor' : 'Produtor'}
                            </label>

                            <input className={containerInput()} type='text' placeholder={type === 'Movie' ? 'Diretor...' : 'Produtor...'} id='owner' {...register('owner')} />
                        </span>

                        {type === 'Movie' &&
                            <span>
                                <label className={labelText()} htmlFor="duration">Duração</label>

                                <div className={containerDuration()}>
                                    <input className={containerInputsDuration()} type='number' placeholder='Horas' id='duration' {...register('durationHours')} />
                                    <input className={containerInputsDuration()} type='number' placeholder='Minutos' {...register('durationMinutes')} />
                                </div>
                            </span>
                        }

                        <span>
                            <label className={labelText()} htmlFor="age">Classificação indicativa</label>

                            <select className={containerInput()} id='age' {...register('ageRestriction')} >
                                <option value='0'>L</option>
                                <option value='10'>10</option>
                                <option value='12'>12</option>
                                <option value='14'>14</option>
                                <option value='16'>16</option>
                                <option value='18'>18</option>
                            </select>

                            {errors.ageRestriction && <p>{errors.ageRestriction.message}</p>}
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="releaseYear">Ano de lançamento</label>

                            <input className={containerInput()} type='text' placeholder='Ano de lançamento...' id='releaseYear' {...register('releaseYear')} />

                            {errors.releaseYear && <p>{errors.releaseYear.message}</p>}
                        </span>

                        <button type='submit' className={button()}>
                            ADICIONAR

                            <PlusCircle className={icon()} size={20} color='#fff' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalCreate;