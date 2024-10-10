import React from 'react'

function ContainerHourRestriction({ hour, restriction }) {
    return (
        <div className='
            w-full mt-4
            flex justify-between items-center
        '>
            <span className='
                text-sm font-inter font-normal text-slate-400
            '>
                {hour}
            </span>
            {restriction === 'L' && (
                <span className='
                    w-6 h-6
                    bg-green-500
                    text-white rounded-md
                    text-sm font-inter font-bold
                    flex justify-center items-center
                '>
                    L
                </span>
            )}

            {restriction === '10' && (
                <span className='
                    w-6 h-6
                    bg-blue-500
                    text-white rounded-md
                    text-sm font-inter font-bold
                    flex justify-center items-center
                '>
                    10
                </span>
            )}

            {restriction === '12' && (
                <span className='
                    w-6 h-6
                    bg-yellow-500
                    text-white rounded-md
                    text-sm font-inter font-bold
                    flex justify-center items-center
                '>
                    12
                </span>
            )}

            {restriction === '14' && (
                <span className='
                    w-6 h-6
                    bg-orange-500
                    text-white rounded-md
                    text-sm font-inter font-bold
                    flex justify-center items-center
                '>
                    14
                </span>
            )}

            {restriction === '16' && (
                <span className='
                    w-6 h-6
                    bg-red-500
                    text-white rounded-md
                    text-sm font-inter font-bold
                    flex justify-center items-center
                '>
                    16
                </span>
            )}

            {restriction === '18' && (
                <span className='
                    w-6 h-6
                    bg-black
                    text-white rounded-md
                    text-sm font-inter font-bold
                    flex justify-center items-center
                '>
                    18
                </span>
            )}
        </div>
    )
}

            export default ContainerHourRestriction