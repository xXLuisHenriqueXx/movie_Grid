import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { episodeSchema } from '../../../schemas/validationSchemas';
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

function ModalCreateEpisode({ setShowModal, itemID }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(episodeSchema)
    });

    const onSubmit = async (data) => {
        try {
            const { title, description, durationHours, durationMinutes, season, episodeNumber } = data;

            const duration = (durationHours * 60) + durationMinutes;
            const seasonInt = parseInt(season);
            const episodeNumberInt = parseInt(episodeNumber);

            const params = {
                title,
                description,
                durationMinutes: duration,
                season: seasonInt,
                episodeNumber: episodeNumberInt,
                seriesID: itemID
            }

            const { status } = await ContentService.createEpisode(params.title, params.description, params.durationMinutes, params.season, params.episodeNumber, params.seriesID);

            if (status === 200) {
                alert('Episódio criado com sucesso');
                window.location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className={containerMain()} onClick={() => setShowModal(false)}>
            <div className={containerModal()} onClick={(e) => e.stopPropagation()}>
                <h1 className={title()}>
                    Adicionar episódio
                </h1>
                <div className={containerForm()}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <span>
                            <label className={labelText()} htmlFor="title">Título</label>

                            <input className={containerInput()} type='text' placeholder='Título...' id='title' {...register('title')} />

                            {errors.title && <span>{errors.title.message}</span>}
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="description">Descrição</label>

                            <input className={containerInput()} type='text' placeholder='Descrição...' id='description' {...register('description')} />

                            {errors.description && <span>{errors.description.message}</span>}
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="duration">Duração</label>

                            <div className={containerDuration()}>
                                <input className={containerInputsDuration()} type='text' placeholder='Horas' id='duration' {...register('durationHours')} />
                                <input className={containerInputsDuration()} type='text' placeholder='Minutos' {...register('durationMinutes')} />
                            </div>

                            {errors.durationHours && <span>{errors.durationHours.message}</span>}
                            {errors.durationMinutes && <span>{errors.durationMinutes.message}</span>}
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="season">Temporada</label>

                            <input className={containerInput()} type='text' placeholder='Temporada...' id='season' {...register('season')} />

                            {errors.season && <span>{errors.season.message}</span>}
                        </span>

                        <span>
                            <label className={labelText()} htmlFor="episodeNumber">Número do episódio</label>

                            <input className={containerInput()} type='text' placeholder='Número do episódio...' id='episodeNumber' {...register('episodeNumber')} />

                            {errors.episodeNumber && <span>{errors.episodeNumber.message}</span>}
                        </span>

                        <button type='submit' className={button()}>
                            ADICIONAR

                            <PlusCircle className={icon()} size={20} color='#fff' />
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ModalCreateEpisode;