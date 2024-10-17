import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerModal: 'absolute top-10 right-0 w-[21.5rem] h-96 bg-slate-800 rounded-md shadow-md shadow-slate-950 z-50',
        buttonFilter: 'relative flex flex-row items-center px-4 py-1 bg-slate-800 hover:bg-slate-700 transition-all duration-300 text-white rounded-md cursor-pointer',
        iconFilter: 'w-4 h-4 ml-2',
    }
});

const { containerModal, buttonFilter, iconFilter } = card();

const buttonFilterInsideProps = [
    {
        name: 'Programas',
        action: () => console.log('Programas')
    },
    {
        name: 'Filmes',
        action: () => console.log('Filmes')
    },
    {
        name: 'Novelas',
        action: () => console.log('Novelas')
    }
]

function ButtonFilter() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(!showModal)} className={buttonFilter()}>
                Filtrar
                <Filter className={iconFilter()} />

                {showModal && (
                    <div onClick={(e) => e.stopPropagation()} className={containerModal()}>
                        <div className='
                            flex flex-col items-center w-full h-full py-2 px-4
                        '>
                            <h1 className='
                                text-lg font-oswald font-bold text-center text-white
                            '>Filtros</h1>

                            <div className='
                                grid grid-cols-3 w-full mt-4 gap-2
                            '>
                                {buttonFilterInsideProps.map((item, index) => (
                                    <button onClick={item.action} className='
                                        flex flex-row items-center justify-center py-1 bg-transparent border-2 border-slate-700 hover:bg-slate-700 transition-all duration-300 rounded-md cursor-pointer
                                    '>
                                        <p className='text-sm text-white'>{item.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </button>
        </>
    )
}

export default ButtonFilter;