import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { dailySchema } from '../../../schemas/validationSchemas';
import ContentService from '../../../services/contentService';
import { tv } from 'tailwind-variants';
import { format } from 'date-fns';

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

function ModalCreateDaily({ setShowModal, type, itemID }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(dailySchema)
    });

    const onSubmit = async (data) => {
        try {
            const { date, startTime, endTime } = data;

            const dateFormatted = format(new Date(date), 'yyyy-MM-dd');

            const params = {
                date: dateFormatted,
                startTime,
                endTime,
                contentType: type,
                movieID: type === 'Movie' ? itemID : null,
                episodeID: type === 'Series' ? itemID : null
            }

            console.log(params);

            const response = await ContentService.createDailySchedule(params.date, params.startTime, params.endTime, params.contentType, params.movieID, params.episodeID);

            console.log(response);

            if (response.status === 201) {
                alert('Programação criada com sucesso');
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
                    Adicionar programação
                </h1>
                <div className={containerForm()}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <span>
                            <label className={labelText()} htmlFor="date">Data</label>
                            
                            <input className={containerInput()} type='date' id='date' {...register('date')} />
                            
                            {errors.date && <span>{errors.date.message}</span>}
                        </span>
                        
                        <span>
                            <label className={labelText()} htmlFor="times">Horário</label>

                            <div className={containerDuration()}>
                                <input className={containerInputsDuration()} type='time' placeholder='Hora de início' id='times' {...register('startTime')} />
                                <input className={containerInputsDuration()} type='time' placeholder='Hora de fim' {...register('endTime')} />
                            </div>

                            {errors.durationHours && <span>{errors.startTime.message}</span>}
                            {errors.durationMinutes && <span>{errors.endTime.message}</span>}
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

export default ModalCreateDaily;