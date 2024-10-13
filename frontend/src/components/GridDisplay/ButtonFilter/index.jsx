import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        buttonFilter: 'relative flex flex-row items-center px-4 py-1 bg-slate-800 hover:bg-slate-700 transition-all duration-300 text-white rounded-md cursor-pointer',
        iconFilter: 'w-4 h-4 ml-2'
    }
});

const { buttonFilter, iconFilter } = card();

function ButtonFilter() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(!showModal)} className={buttonFilter()}>
                Filtrar
                <Filter className={iconFilter()} />

                {showModal && (
                    <div className='
                        absolute
                        top-10
                        right-0
                        w-[21.5rem]
                        h-96
                        bg-slate-800
                        rounded-md
                        z-50
                    '>
                        Modal
                    </div>
                )}
            </button>
        </>
    )
}

export default ButtonFilter