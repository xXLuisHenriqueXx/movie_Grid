import React from 'react';
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerHourRestriction: 'flex justify-between items-center w-full mt-4',
        textHour: 'text-sm font-inter font-normal text-slate-400',
        spanRestriction: 'w-6 h-6 text-white rounded-md text-sm font-inter font-bold flex justify-center items-center'
    },
    variants: {
        restrictionText: {
            L: {
                spanRestriction: 'bg-green-500'
            },
            10: {
                spanRestriction: 'bg-blue-500'
            },
            12: {
                spanRestriction: 'bg-yellow-500'
            },
            14: {
                spanRestriction: 'bg-orange-500'
            },
            16: {
                spanRestriction: 'bg-red-500'
            },
            18: {
                spanRestriction: 'bg-black'
            }
        }
    }
});

const { containerHourRestriction, textHour, spanRestriction } = card();

function ContainerHourRestriction({ hour, restriction }) {
    return (
        <div className={containerHourRestriction()}>
            <h2 className={textHour()}>
                {hour}
            </h2>

            <span className={spanRestriction({ restrictionText: restriction })}>
                {restriction}
            </span>
        </div>
    )
}

export default ContainerHourRestriction;