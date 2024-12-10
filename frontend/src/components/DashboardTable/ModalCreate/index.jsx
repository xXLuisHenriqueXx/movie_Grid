import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
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
        containerInputCheckBox: 'flex flex-col items-start w-full mb-4 p-2 bg-gray-700 rounded-sm text-white focus:outline-none',
        containerDuration: 'flex space-x-2 mb-4',
        containerInputsDuration: 'w-full p-2 bg-gray-700 rounded-sm text-white focus:outline-none',
        title: 'text-lg font-bold text-center text-gray-200 mb-4',
        labelText: 'text-white text-sm',
        button: 'relative flex flex-row justify-center items-center w-full p-2 bg-blue-700 rounded-sm text-white hover:bg-blue-500',
        icon: 'absolute right-4'
    }
});

const { containerMain, containerModal, containerForm, containerInput, containerInputCheckBox, containerDuration, containerInputsDuration, title, labelText, button, icon } = card();

function ModalCreate({ setShowModal, type, tags, itemID }) {
    const [image, setImage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(contentSchema)
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const onSubmit = async (data) => {
        try {
            if (type === 'Movie') {
                const selectedTags = tags.filter(tag => data.tags.includes(tag));

                const { title, description, owner, durationHours, durationMinutes, ageRestriction, releaseYear } = data;

                const duration = parseInt(durationHours) * 60 + parseInt(durationMinutes);
                const ageRestrictionInt = parseInt(ageRestriction);
                const releaseYearInt = parseInt(releaseYear);

                const params = {
                    title,
                    description,
                    owner,
                    duration,
                    ageRestriction: ageRestrictionInt,
                    releaseYear: releaseYearInt,
                    tag: selectedTags,
                    image
                }

                const { status } = await ContentService.createMovie(params.title, params.description, params.owner, params.duration, params.ageRestriction, params.releaseYear, params.tag, params.image);

                if (status === 201) {
                    alert('Filme criado com sucesso');
                    setShowModal(false);
                    window.location.reload();
                }

            } else if (type === 'TVShow') {
                const selectedTags = tags.filter(tag => data.tags.includes(tag));

                const { title, description, owner, ageRestriction, releaseYear } = data;

                const ageRestrictionInt = parseInt(ageRestriction);
                const releaseYearInt = parseInt(releaseYear);

                const params = {
                    title,
                    description,
                    owner,
                    ageRestriction: ageRestrictionInt,
                    releaseYear: releaseYearInt,
                    tag: selectedTags,
                    image
                }

                const response = await ContentService.createTVShow(params.title, params.description, params.owner, params.ageRestriction, params.releaseYear, params.tag, params.image);

                if (response.status === 201) {
                    alert('Programa criado com sucesso');
                    setShowModal(false);
                    window.location.reload();
                }

            } else if (type === 'SoapOpera') {
                const selectedTags = tags.filter(tag => data.tags.includes(tag));

                const { title, description, owner, ageRestriction, releaseYear } = data;

                const ageRestrictionInt = parseInt(ageRestriction);
                const releaseYearInt = parseInt(releaseYear);

                const params = {
                    title,
                    description,
                    owner,
                    ageRestriction: ageRestrictionInt,
                    releaseYear: releaseYearInt,
                    tag: selectedTags,
                    image
                }

                const { status } = await ContentService.createSoapOpera(params.title, params.description, params.owner, params.ageRestriction, params.releaseYear, params.tag, params.image);

                if (status === 201) {
                    alert('Novela criada com sucesso');
                    setShowModal(false);
                    window.location.reload();
                }

            } else if (type === 'Tag') {
                const { title } = data;

                const { status } = await ContentService.createTag(title);

                if (status === 201) {
                    alert('Tag criada com sucesso');
                    setShowModal(false);
                    window.location.reload();
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
                    {type === 'Tag' && ' tag'}
                </h1>
                <div className={containerForm()}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <span>
                            <label className={labelText()} htmlFor="title">Título</label>

                            <input className={containerInput()} type='text' placeholder='Título...' id='title' {...register('title')} />

                            {errors.title && <span>{errors.title.message}</span>}
                        </span>

                        {type !== 'Tag' &&
                            <span>
                                <label className={labelText()} htmlFor="description">Descrição</label>

                                <input className={containerInput()} type='text' placeholder='Descrição...' id='description' {...register('description')} />

                                {errors.description && <span>{errors.description.message}</span>}
                            </span>
                        }

                        {type !== 'Tag' &&
                            <span>
                                <label className={labelText()} htmlFor="owner">
                                    {type === 'Movie' ? 'Diretor' : 'Produtor'}
                                </label>

                                <input className={containerInput()} type='text' placeholder={type === 'Movie' ? 'Diretor...' : 'Produtor...'} id='owner' {...register('owner')} />

                                {errors.owner && <span>{errors.owner.message}</span>}
                            </span>
                        }

                        {type === 'Movie' &&
                            <span>
                                <label className={labelText()} htmlFor="duration">Duração</label>

                                <div className={containerDuration()}>
                                    <input className={containerInputsDuration()} type='text' placeholder='Horas' id='duration' {...register('durationHours')} />
                                    <input className={containerInputsDuration()} type='text' placeholder='Minutos' {...register('durationMinutes')} />
                                </div>

                                {errors.durationHours && <span>{errors.durationHours.message}</span>}
                                {errors.durationMinutes && <span>{errors.durationMinutes.message}</span>}
                            </span>
                        }

                        {type !== 'Tag' &&
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

                                {errors.ageRestriction && <span>{errors.ageRestriction.message}</span>}
                            </span>
                        }

                        {type !== 'Tag' &&
                            <span>
                                <label className={labelText()}>Tags</label>

                                <div className={containerInputCheckBox()}  >
                                    {tags.map((tag, index) => (
                                        <div key={index}>
                                            <input type='checkbox' value={tag} {...register('tags')} />
                                            <label> {tag}</label>
                                        </div>
                                    ))}
                                </div>

                                {errors.tags && <span>{errors.tags.message}</span>}
                            </span>
                        }

                        {type !== 'Tag' &&
                            <span>
                                <label className={labelText()} htmlFor="releaseYear">Ano de lançamento</label>

                                <input className={containerInput()} type='text' placeholder='Ano de lançamento...' id='releaseYear' {...register('releaseYear')} />

                                {errors.releaseYear && <span>{errors.releaseYear.message}</span>}
                            </span>
                        }

                        {type !== 'Tag' &&
                            <span>
                                <label className={labelText()} htmlFor="image">Imagem</label>

                                <input className={containerInput()} type='file' id='image' onChange={handleImageChange} />
                            </span>
                        }

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

export default ModalCreate;