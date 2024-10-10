import { Filter } from 'lucide-react';
import React from 'react';
import ContainerDisplay from './ContainerDisplay';

const data = [
    {
        id: 1,
        title: 'Programa 1',
        description: 'Descrição do programa 1',
        hour: '08:00',
        restriction: 'L',
    },
    {
        id: 2,
        title: 'Programa 2',
        description: 'Descrição do programa 2',
        hour: '09:00',
        restriction: 'L',
    },
    {
        id: 3,
        title: 'Programa 3',
        description: 'Descrição do programa 3',
        hour: '10:00',
        restriction: '10',
    },
    {
        id: 4,
        title: 'Programa 4',
        description: 'Descrição do programa 4',
        hour: '11:00',
        restriction: '10',
    },
    {
        id: 5,
        title: 'Programa 5',
        description: 'Descrição do programa 5',
        hour: '12:00',
        restriction: '12',
    },
    {
        id: 6,
        title: 'Programa 6',
        description: 'Descrição do programa 6',
        hour: '13:00',
        restriction: '12',
    },
    {
        id: 7,
        title: 'Programa 7',
        description: 'Descrição do programa 7',
        hour: '14:00',
        restriction: '14',
    },
    {
        id: 8,
        title: 'Programa 8',
        description: 'Descrição do programa 8',
        hour: '15:00',
        restriction: '14',
    },
    {
        id: 9,
        title: 'Programa 9',
        description: 'Descrição do programa 9',
        hour: '16:00',
        restriction: '16',
    },
    {
        id: 10,
        title: 'Programa 10',
        description: 'Descrição do programa 10',
        hour: '17:00',
        restriction: '16',
    },
    {
        id: 11,
        title: 'Programa 11',
        description: 'Descrição do programa 11',
        hour: '18:00',
        restriction: '18',
    },
    {
        id: 12,
        title: 'Programa 12',
        description: 'Descrição do programa 12',
        hour: '19:00',
        restriction: '18',
    }
]

function GridDisplay() {
    return (
        <div className='
            w-full h-full pb-4 px-4 md:px-6 lg:px-8
        '>
            <div className='
                w-full
                flex justify-between items-center
            '>
                <h1 className='
                    text-lg font-oswald font-medium text-slate-400
                '>
                    Programação
                </h1>

                <button onClick={() => {}} className='
                    px-4 py-1
                    flex flex-row items-center
                    bg-slate-800 hover:bg-slate-700 transition-all duration-300
                    text-white rounded-md
                    cursor-pointer
                '>
                    Filtrar
                    <Filter className='w-4 h-4 ml-2' /> 
                </button>
            </div>

            <div className='
                w-full h-full mt-4
                grid grid-cols-2 gap-4
                md:grid-cols-3 lg:grid-cols-4
            '>
                {data.map((item) => (
                    <ContainerDisplay key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default GridDisplay;