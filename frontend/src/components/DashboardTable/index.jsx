import React from 'react';
import { Info, PlusCircle } from 'lucide-react';
import ModalCreate from './ModalCreate';

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
            <div className='
                w-full flex flex-row justify-between items-center
            '>
                <h1 className='
                    text-md font-medium text-gray-200
                '>
                    {title}
                </h1>

                <button onClick={() => setShowModal(true)} className='
                    relative flex flex-row justify-between items-center p-1 mb-2 bg-blue-700 rounded-sm hover:bg-blue-500
                '>
                    <span className='
                        text-sm text-white font-bold
                    '>
                        ADICIONAR
                    </span>

                    <PlusCircle size={16} color='#fff' className='ml-1' />
                </button>
            </div>
            <div className='
                w-full py-2 bg-gray-900 rounded-sm
            '>
                <div className='
                    w-full         
                '>
                    {data.length === 0 && (
                        <span className='
                            flex flex-row justify-between items-center p-2
                        '>
                            <h2 className='
                                relative max-w-xs text-white text-sm overflow-hidden truncate
                            '>
                                Nenhum dado para ser mostrado aqui...
                            </h2>
                        </span>
                    )}

                    {data.map((item, index) => (
                        <span index={index} className='
                            flex flex-row justify-between items-center p-2
                        '>
                            <h2 className='
                                relative max-w-xs text-white text-sm overflow-hidden truncate
                            '>
                                {item.name}
                            </h2>

                            <Info size={20} color='#fff' onClick={() => console.log('Info')} />
                        </span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DashboardTable;