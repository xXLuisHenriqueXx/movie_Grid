import React from 'react';
import { Info, PlusCircle } from 'lucide-react';
import ModalCreate from './ModalCreate';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'w-full flex flex-row justify-between items-center',
        containerData: 'w-full py-2 bg-gray-900 rounded-sm',
        title: 'text-md font-medium text-gray-200',
        button: 'relative flex flex-row justify-between items-center p-1 mb-2 bg-blue-700 rounded-sm hover:bg-blue-500',
        buttonText: 'text-sm text-white font-bold',
        icon: 'ml-1',
        itemSpan: 'flex flex-row justify-between items-center p-2',
        itemText: 'relative max-w-xs text-white text-sm overflow-hidden truncate'
    }
});


const { containerMain, containerData, title, button, buttonText, itemSpan, itemText } = card();

function DashboardTable({ title, type, data, showModal, setShowModal }) {
    return (
        <>
            {showModal && 
                <ModalCreate 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    type={type}
                />  
            }
            <div className={containerMain()}>
                <h1 className={title()}>
                    {title}
                </h1>

                <button className={button()} onClick={() => setShowModal(true)}>
                    <span className={buttonText()}>
                        ADICIONAR
                    </span>

                    <PlusCircle className={icon()} size={16} color='#fff' />
                </button>
            </div>
            <div className={containerData()}>
                <div className='w-full'>
                    {data.length === 0 && (
                        <span className={itemSpan()}>
                            <h2 className={itemText()}>
                                Nenhum dado para ser mostrado aqui...
                            </h2>
                        </span>
                    )}

                    {/* {data.map((item, index) => (
                        <span className={itemSpan()} index={index}>
                            <h2 className={itemText()}>
                                {item.name}
                            </h2>

                            <Info size={20} color='#fff' onClick={() => console.log('Info')} />
                        </span>
                    ))} */}
                </div>
            </div>
        </>
    )
}

export default DashboardTable;