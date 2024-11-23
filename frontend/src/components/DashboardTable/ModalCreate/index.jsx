import React from 'react'

function ModalCreate(showModal, setShowModal, type) {
  return (
    <div className='
        absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50
    '>
        <div className='
            w-1/3 h-1/3 bg-gray-800 rounded-sm
        '>
            <div className='
                w-full flex flex-row justify-between items-center p-2
            '>
            <h1 className='
                text-md font-medium text-gray-200
            '>
                Adicionar {type}
            </h1>
    
            <button onClick={() => setShowModal(false)} className='
                relative flex flex-row justify-between items-center p-1 bg-red-700 rounded-sm hover:bg-red-500
            '>
                <span className='
                    text-sm text-white font-bold
                '>
                Fechar
                </span>
            </button>
            </div>
            <div className='
                w-full p-2
            '>
            <input type='text' placeholder='Nome' className='
                w-full p-2 bg-gray-700 rounded-sm text-white
            ' />
            <input type='text' placeholder='Descrição' className='
                w-full p-2 bg-gray-700 rounded-sm text-white mt-2
            ' />
            <button className='
                w-full p-2 bg-blue-700 rounded-sm text-white mt-2 hover:bg-blue-500
            '>
                Adicionar
            </button>
            </div>
        </div>
    </div>
  )
}

export default ModalCreate;