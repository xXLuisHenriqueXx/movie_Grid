import React, { useState } from 'react';
import ContainerHourRestriction from './ContainerHourRestriction';
import DetailsModal from '../../DetailsModal';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'flex flex-col justify-between items-center w-full h-48  bg-slate-900 hover:bg-slate-800 transition-all duration-300 rounded-md cursor-pointer',
        spanImage: 'w-full h-3/5 bg-slate-700 rounded-md',
        containerText: 'flex flex-col items-start w-full h-2/5 px-2 mt-2',
        title: 'text-base font-oswald font-medium text-slate-400'
    }
});

const { containerMain, spanImage, containerText, title } = card();

function ContainerDisplay({ item, type, hasUserToken }) {
    const [showModal, setShowModal] = useState(false);

    console.log(item);

    return (
        <>
            {showModal && <DetailsModal setShowModal={setShowModal} item={item} type={type} hasUserToken={hasUserToken} />}
            
            <div onClick={() => setShowModal(true)} className={containerMain()}>
                <img src={`http://localhost:3000/${item.src}`} alt={item.title} className={spanImage()} />

                <div className={containerText()}>
                    <h2 className={title()}>
                        {item.title}
                    </h2>

                    <ContainerHourRestriction hour={item.releaseYear} restriction={item.ageRestriction} />
                </div>
            </div>
        </>
    )
}

export default ContainerDisplay;