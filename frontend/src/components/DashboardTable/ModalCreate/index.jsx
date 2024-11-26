import { PlusCircle } from 'lucide-react';
import React from 'react'

function ModalCreate({ setShowModal, type }) {
    return (
        <div onClick={() => setShowModal(false)} className='
            fixed top-0 left-0 min-w-full min-h-full bg-slate-950 bg-opacity-90 z-[98]
        '>
            <div onClick={(e) => e.stopPropagation()} className='
                absolute bottom-0 left-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col p-4 md:px-6 lg:px-8 2xl:p-8 w-full md:w-[90%] lg:w-2/3 xl:w-3/5 2xl:w-2/5 h-3/4 xl:h-[90%] 2xl:h-[80%] overflow-auto bg-slate-900 rounded-t-3xl md:rounded-lg z-[99]
            '>
                <h1 className='
                    text-lg font-bold text-center text-gray-200 mb-4
                '>
                    Adicionar
                    {type === 'Movie' && ' filme'}
                    {type === 'TVShow' && ' programa de TV'}
                    {type === 'SoapOpera' && ' novela'}
                </h1>
                <div className='
                    w-full
                '>
                    <span>
                        <label htmlFor="title" className='
                            text-white text-sm
                        '>Título</label>

                        <input type='text' placeholder='Título...' id='title' className='
                            w-full mb-4 p-2 bg-gray-700 rounded-sm text-white focus:outline-none
                        ' />
                    </span>

                    <span>
                        <label htmlFor="description" className='
                            text-white text-sm
                        '>Descrição</label>

                        <input type='text' placeholder='Descrição...' id='description' className='
                            w-full mb-4 p-2 bg-gray-700 rounded-sm text-white focus:outline-none
                        ' />
                    </span>

                    <span>
                        <label htmlFor="owner" className='
                            text-white text-sm
                        '>
                            {type === 'Movie' ? 'Diretor' : 'Produtor'}
                        </label>

                        <input type='text' placeholder={type === 'Movie' ? 'Diretor...' : 'Produtor...'} id='owner' className='
                            w-full mb-4 p-2 bg-gray-700 rounded-sm text-white focus:outline-none
                        ' />
                    </span>

                    {type === 'Movie' &&
                        <span>
                            <label htmlFor="duration" className='
                                text-white text-sm
                            '>Duração</label>

                            <div className='flex space-x-2 mb-4'>
                                <input type='number' placeholder='Horas' id='duration' className='
                                    w-full p-2 bg-gray-700 rounded-sm text-white focus:outline-none
                                ' />
                                <input type='number' placeholder='Minutos' className='
                                    w-full p-2 bg-gray-700 rounded-sm text-white focus:outline-none
                                ' />
                            </div>
                        </span>
                    }

                    <span>
                        <label htmlFor="age" className='
                            text-white text-sm
                        '>Classificação indicativa</label>

                        <select id='age' className='w-full mb-4 p-2 bg-gray-700 rounded-sm text-white focus:outline-none'>
                            <option value='L'>L</option>
                            <option value='10'>10</option>
                            <option value='12'>12</option>
                            <option value='14'>14</option>
                            <option value='16'>16</option>
                            <option value='18'>18</option>
                        </select>
                    </span>

                    <span>
                        <label htmlFor="releaseYear" className='
                            text-white text-sm
                        '>Ano de lançamento</label>

                        <input type='text' placeholder='Ano de lançamento...' id='releaseYear' className='
                            w-full mb-6 p-2 bg-gray-700 rounded-sm text-white focus:outline-none
                        ' />
                    </span>

                    <button className='
                        relative flex flex-row justify-center items-center w-full p-2 bg-blue-700 rounded-sm text-white hover:bg-blue-500
                    '>
                        ADICIONAR

                        <PlusCircle size={20} color='#fff' className='absolute right-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalCreate;