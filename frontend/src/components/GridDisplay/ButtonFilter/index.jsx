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
        text: 'text-xs text-white'
    },
    variants: {
        buttonFilterInside: {
            active: {
                buttonFilterInside: 'bg-slate-700'
            }
        }
    }
});

const { containerModal, containerModalView, buttonFilter, iconFilter, title, grid, buttonFilterInside, text } = card();



const types = [
    {
        name: 'Programas',
        value: 'Series'
    },
    {
        name: 'Filmes',
        value: 'Movies'
    },
    {
        name: 'Novelas',
        value: 'Series'
    }
]

function ButtonFilter({ tags, handleFilter }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [activeButtonTagIndex, setActiveButtonTagIndex] = useState();
    const [activeButtonTypeIndex, setActiveButtonTypeIndex] = useState();

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
                                {types.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedType(item.value);
                                            setActiveButtonTypeIndex(index);
                                        }}
                                        className={activeButtonTypeIndex === index ? buttonFilterInside({ buttonFilterInside: "active" }) : buttonFilterInside()}>
                                        <p className={text()}>{item.name}</p>
                                    </button>
                                ))}
                            </div>

                            <hr className='
                                w-full border-1 border-slate-700 mt-4
                            ' />

                            <div className={grid()}>
                                {tags.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedTag(item);
                                            setActiveButtonTagIndex(index);
                                        }} 
                                        className={activeButtonTagIndex === index ? buttonFilterInside({ buttonFilterInside: "active" }) : buttonFilterInside()}>
                                        <p className={text()}>{item}</p>
                                    </button>
                                ))}
                            </div>

                            <button onClick={() => handleFilter(selectedTag, selectedType)} className='
                                w-full py-2 bg-blue-700 hover:bg-blue-600 transition-all duration-300 text-white font-semibold rounded-md cursor-pointer mt-4
                            '>
                                Filtrar
                            </button>
                        </div>
                    </div>
                )}
            </button>
        </>
    )
}

export default ButtonFilter;