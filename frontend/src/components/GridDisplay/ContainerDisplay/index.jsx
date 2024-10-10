import React from 'react'
import ContainerHourRestriction from './ContainerHourRestriction'

function ContainerDisplay({ item }) {
    return (
        <div className='
            w-full h-56 rounded-md
            flex flex-col justify-between items-center
            bg-slate-900 hover:bg-slate-800 transition-all duration-300
        '>
            <span className='
                w-full h-2/4 bg-slate-700 rounded-md
            '/>

            <div className='
                w-full h-2/4 px-2 mt-2
                flex flex-col items-start
            '>
                <h2 className='
                    text-base font-oswald font-medium text-slate-400
                '>
                    {item.title}
                </h2>

                <span className='
                    text-xs font-inter font-normal text-slate-400
                '>
                    {item.description}
                </span> 
                
                <ContainerHourRestriction hour={item.hour} restriction={item.restriction} />
            </div>
        </div>
    )
}

export default ContainerDisplay