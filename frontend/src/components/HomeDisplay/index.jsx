import React from 'react';
import ContainerDisplay from './ContainerDisplay';
import { tv } from 'tailwind-variants';

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

const movies = [
    {
        id: 1,
        title: 'The Journey',
        description: 'In "The Journey", viewers are taken on an emotional and breathtaking road trip across the vast American landscape. The story follows a family who embarks on a cross-country adventure, hoping to reconnect after a period of emotional estrangement. Along the way, they encounter stunning scenery, challenging personal trials, and heartwarming moments that remind them of the importance of family, love, and resilience.',
        director: 'Michael Roberts',
        durationSeconds: 7200,
        ageRestriction: '12',
        releaseYear: '2020',
        createdAt: '2024-01-01T14:00:00Z'
    },
    {
        id: 2,
        title: 'The Haunting',
        description: 'A chilling tale of suspense, "The Haunting" follows a group of friends who decide to spend the night in an abandoned mansion. What begins as a thrilling adventure quickly turns into a night of terror as they come face to face with a malevolent spirit. The group must unravel the dark history of the mansion and survive until morning. Director Thomas King masterfully blends horror, mystery, and psychological tension in this spine-tingling film.',
        director: 'Thomas King',
        durationSeconds: 5400,
        ageRestriction: '18',
        releaseYear: '2021',
        createdAt: '2024-01-01T19:30:00Z'
    },
    {
        id: 3,
        title: 'Secrets in the City',
        description: 'In the urban jungle of New York City, "Secrets in the City" reveals the hidden lives of ordinary people with extraordinary secrets. This intense drama explores the themes of trust, betrayal, and redemption as multiple storylines intersect in unexpected ways. Directed by Sophia Carter, the film showcases a stellar ensemble cast and a plot full of twists and turns that will leave viewers on the edge of their seats until the final reveal.',
        director: 'Sophia Carter',
        durationSeconds: 5400,
        ageRestriction: '16',
        releaseYear: '2019',
        createdAt: '2024-01-01T18:00:00Z'
    },
    {
        id: 4,
        title: 'The Last Stand',
        description: 'In "The Last Stand", a group of survivors must band together to defend their town against a horde of ravenous zombies. As the undead close in, tensions rise, and the group must confront their fears and past traumas to survive. Director Sarah Johnson expertly blends horror, action, and drama in this pulse-pounding thriller that will keep viewers on the edge of their seats until the final frame.',
        director: 'Sarah Johnson',
        durationSeconds: 6300,
        ageRestriction: '18',
        releaseYear: '2022',
        createdAt: '2024-01-01T20:00:00Z'
    },
    {
        id: 5,
        title: 'The Lost City',
        description: 'In "The Lost City", a team of explorers embarks on a perilous journey to uncover the secrets of a long-lost civilization. As they navigate treacherous jungles, ancient ruins, and deadly traps, they must rely on their wits and courage to survive. Director Alex Thompson crafts a thrilling adventure that combines action, mystery, and suspense in equal measure, keeping viewers guessing until the very end.',
        director: 'Alex Thompson',
        durationSeconds: 6000,
        ageRestriction: '12',
        releaseYear: '2023',
        createdAt: '2024-01-01T21:00:00Z'
    },
    {
        id: 6,
        title: 'The Final Reckoning',
        description: 'In "The Final Reckoning", a detective must solve a series of gruesome murders that lead him on a dark and twisted journey into the heart of the criminal underworld. As he uncovers the truth behind the killings, he must confront his own demons and make difficult choices that will determine the fate of the city. Director James Lee weaves a complex and gripping tale of mystery, suspense, and redemption that will keep viewers guessing until the final frame.',
        director: 'James Lee',
        durationSeconds: 6600,
        ageRestriction: '16',
        releaseYear: '2021',
        createdAt: '2024-01-01T22:00:00Z'
    },
    {
        id: 7,
        title: 'The Dark Forest',
        description: 'In "The Dark Forest", a group of friends embark on a camping trip in a remote forest, only to discover that they are not alone. As they are hunted by a malevolent force, they must rely on their wits and courage to survive the night. Director Emma White crafts a tense and atmospheric horror film that will keep viewers on the edge of their seats until the final, chilling frame.',
        director: 'Emma White',
        durationSeconds: 5700,
        ageRestriction: '18',
        releaseYear: '2020',
        createdAt: '2024-01-01T23:00:00Z'
    }
];

function HomeDisplay() {
    return (
        <div className={containerMain()}>
            {days.map((day) => (
                <div key={day.id} className={containerFlex()}>
                    <h1 className={titleCategory()}>{day.name}</h1>

                    <div className={containerOverflow()}>
                        {movies.map((item) => (
                            <ContainerDisplay key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomeDisplay;