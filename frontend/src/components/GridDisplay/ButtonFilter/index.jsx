import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerModal: 'absolute top-10 right-0 w-[21.5rem] h-96 bg-slate-800 rounded-md shadow-md shadow-slate-950 z-50',
        containerModalView: 'flex flex-col items-center w-full h-full py-2 px-4',
        buttonFilter: 'relative flex flex-row items-center px-4 py-1 bg-slate-800 hover:bg-slate-700 transition-all duration-300 text-white rounded-md cursor-pointer',
        iconFilter: 'w-4 h-4 ml-2',
        title: 'text-lg font-oswald font-bold text-center text-white',
        grid: 'grid grid-cols-3 w-full mt-4 gap-2',
        buttonFilterInside: 'flex flex-row items-center justify-center py-1 bg-transparent border-2 border-slate-700 hover:bg-slate-700 transition-all duration-300 rounded-md cursor-pointer',
        text: 'text-sm text-white'
    }
});

const { containerModal, containerModalView, buttonFilter, iconFilter, title, grid, buttonFilterInside, text } = card();

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
                        <div className={containerModalView()}>
                            <h1 className={title()}>Filtros</h1>

                            <div className={grid()}>
                                {buttonFilterInsideProps.map((item, index) => (
                                    <button onClick={item.action} className={buttonFilterInside()}>
                                        <p className={text()}>{item.name}</p>
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