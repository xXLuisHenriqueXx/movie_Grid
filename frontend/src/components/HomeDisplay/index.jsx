import React, { useState, useEffect } from 'react';
import ContainerDisplay from './ContainerDisplay';
import { tv } from 'tailwind-variants';
import ContentService from '../../services/contentService';
import { format } from 'date-fns';

const card = tv({
    slots: {
        containerMain: 'w-full px-4 md:px-6 lg:px-8 2xl:px-16',
        containerFlex: 'flex flex-col w-full mt-4',
        containerOverflow: 'flex flex-row justify-start items-center gap-x-4 overflow-x-auto',
        titleCategory: 'text-lg font-oswald font-medium text-slate-400 mb-2'
    }
});

const { containerMain, containerFlex, containerOverflow, titleCategory } = card();

const days = [
    {
        id: 1,
        name: 'Domingo'
    },
    {
        id: 2,
        name: 'Segunda-feira'
    },
    {
        id: 3,
        name: 'Terça-feira'
    },
    {
        id: 4,
        name: 'Quarta-feira'
    },
    {
        id: 5,
        name: 'Quinta-feira'
    },
    {
        id: 6,
        name: 'Sexta-feira'
    },
    {
        id: 7,
        name: 'Sábado'
    }
]

function HomeDisplay() {
    const [scheduleDate, setScheduleDate] = useState({
        'domingo': [],
        'segunda-feira': [],
        'terça-feira': [],
        'quarta-feira': [],
        'quinta-feira': [],
        'sexta-feira': [],
        'sábado': []
    });

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const schedule = {};

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
            const dayName = days[i].name.toLowerCase();
            const response = await ContentService.getDailySchedule(formattedCurrentDate);
            console.log("Response", response);
            if (response.data.success) {
                schedule[dayName] = response.data.schedules;
            } else {
                schedule[dayName] = [];
            }
        }

        setScheduleDate(schedule);
        console.log("Schedule", schedule);
    }

    return (
        <div className={containerMain()}>
            {days.map((day) => (
                <div key={day.id} className={containerFlex()}>
                    <h1 className={titleCategory()}>{day.name}</h1>

                    <div className={containerOverflow()}>
                        {scheduleDate[day.name.toLowerCase()].map((item) => (
                            <ContainerDisplay key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomeDisplay;