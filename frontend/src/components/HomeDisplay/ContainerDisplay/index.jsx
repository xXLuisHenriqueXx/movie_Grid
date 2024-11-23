import React, { useState } from 'react';
import ContainerHourRestriction from './ContainerHourRestriction';
import DetailsModal from '../../DetailsModal';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'flex flex-shrink-0 flex-col justify-between items-center w-56 h-48 bg-slate-900 hover:bg-slate-800 transition-all duration-300 rounded-md cursor-pointer',
        spanImage: 'w-full h-3/5 bg-slate-700 rounded-md',
        containerText: 'flex flex-col items-start w-full h-2/5 px-2 mt-2',
        title: 'text-base font-oswald font-medium text-slate-400'
    }
});

const { containerMain, spanImage, containerText, title } = card();

function ContainerDisplay({ item }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && <DetailsModal setShowModal={setShowModal} item={item} />}
            
            <div onClick={() => setShowModal(true)} className={containerMain()}>
                <span className={spanImage()} />

                <div className={containerText()}>
                    <h2 className={title()}>
                        {item.title}
                    </h2>

                    <ContainerHourRestriction initTime={item.initTime} endTime={item.endTime} restriction={item.ageRestriction} />
                </div>
            </div>
        </>
    )
}

export default ContainerDisplay;