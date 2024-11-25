import React from 'react';
import ContainerDisplay from './ContainerDisplay';
import { tv } from 'tailwind-variants';
import ButtonFilter from './ButtonFilter';

const series = [
    {
        id: 1,
        title: 'Morning News',
        description: 'The "Morning News" delivers an in-depth review of the day’s most important national and international headlines. From politics to economics, and from weather updates to cultural segments, the show keeps viewers informed about the latest developments. With interviews from leading experts and real-time reporting from the field, the show is a trusted source of information for millions of early risers.',
        producer: 'John Smith',
        ageRestriction: 0,
        releaseYear: 2023,
        createdAt: '2024-01-01T08:00:00Z',
        seriesType: 'TVShow'
    },
    {
        id: 2,
        title: 'Cooking with Chef Anna',
        description: 'In "Cooking with Chef Anna", renowned chef Anna Martinez shares her most delicious and innovative recipes. Each episode walks viewers through the step-by-step process of creating gourmet dishes at home. From exotic international cuisine to traditional comfort foods, Chef Anna combines flavors in surprising ways. Her kitchen is always bustling with energy, and the show offers great tips for both novice and experienced cooks alike.',
        producer: 'Anna Martinez',
        ageRestriction: 0,
        releaseYear: 2022,
        createdAt: '2024-01-01T09:00:00Z',
        seriesType: 'TVShow'
    },
    {
        id: 3,
        title: 'Tech Today',
        description: 'As the world of technology evolves at a rapid pace, "Tech Today" keeps viewers up to date on the latest gadgets, software, and innovations shaping our lives. Hosted by tech enthusiast Jason Lee, the show provides insightful reviews, interviews with industry leaders, and hands-on demos of cutting-edge technology. From smartphones to artificial intelligence, every aspect of modern tech is explored with clarity and expertise.',
        producer: 'Jason Lee',
        ageRestriction: 12,
        releaseYear: 2023,
        createdAt: '2024-01-01T10:00:00Z',
        seriesType: 'TVShow'
    },
    {
        id: 4,
        title: 'Science Explorers',
        description: 'Join "Science Explorers" on a fascinating journey through the world of scientific discovery. Hosted by Dr. Emily Chen, this educational program captivates curious minds with hands-on experiments, groundbreaking research, and interviews with leading scientists. Each episode delves into a different field of science, from biology and chemistry to space exploration and environmental studies, making complex topics accessible and fun for children and adults alike.',
        producer: 'Dr. Emily Chen',
        ageRestriction: 10,
        releaseYear: 2021,
        createdAt: '2024-01-01T11:00:00Z',
        seriesType: 'TVShow'
    },
    {
        id: 5,
        title: 'Sports Roundup',
        description: 'Get your daily fix of sports action with "Sports Roundup", the go-to show for all things related to sports. Host David Miller brings you the latest scores, game highlights, and interviews with the biggest stars in the world of athletics. Whether it’s football, basketball, tennis, or motorsports, "Sports Roundup" covers it all with in-depth analysis, exclusive behind-the-scenes footage, and expert predictions for upcoming matches.',
        producer: 'David Miller',
        ageRestriction: 16,
        releaseYear: 2023,
        createdAt: '2024-01-01T12:00:00Z',
        seriesType: 'TVShow'
    },
    {
        id: 6,
        title: 'Love and Betrayal',
        description: 'Set in the glamorous world of high society, "Love and Betrayal" tells the gripping story of powerful families whose relationships are tested by secrets, lies, and illicit affairs. At the center of the drama is a love triangle that threatens to destroy generations of trust. This epic saga spans over a hundred episodes, each filled with unexpected plot twists and emotional confrontations. Viewers are drawn into a world where love is never simple, and loyalty is a rare commodity.',
        producer: 'Emily Harris',
        ageRestriction: 14,
        releaseYear: 2018,
        createdAt: '2024-01-01T16:00:00Z',
        seriesType: 'SoapOpera'
    },
    {
        id: 7,
        title: 'Family Ties',
        description: 'In a small town full of charm and hidden mysteries, "Family Ties" explores the lives of a close-knit family facing challenges that test their strength and unity. From financial struggles to family secrets and health crises, each episode delves deeper into the emotional lives of the characters. The series portrays the everyday joys and heartbreaks of family life with sensitivity, offering viewers a chance to see themselves in the trials of the fictional family.',
        producer: 'James White',
        ageRestriction: 12,
        releaseYear: 2020,
        createdAt: '2024-01-01T17:00:00Z',
        seriesType: 'SoapOpera'
    }
];

const movies = [
    {
        id: 1,
        title: 'The Journey',
        description: 'In "The Journey", viewers are taken on an emotional and breathtaking road trip across the vast American landscape. The story follows a family who embarks on a cross-country adventure, hoping to reconnect after a period of emotional estrangement. Along the way, they encounter stunning scenery, challenging personal trials, and heartwarming moments that remind them of the importance of family, love, and resilience.',
        director: 'Michael Roberts',
        durationSeconds: 7200,
        ageRestriction: 12,
        releaseYear: 2020,
        createdAt: '2024-01-01T14:00:00Z',
    },
    {
        id: 2,
        title: 'The Haunting',
        description: 'A chilling tale of suspense, "The Haunting" follows a group of friends who decide to spend the night in an abandoned mansion. What begins as a thrilling adventure quickly turns into a night of terror as they come face to face with a malevolent spirit. The group must unravel the dark history of the mansion and survive until morning. Director Thomas King masterfully blends horror, mystery, and psychological tension in this spine-tingling film.',
        director: 'Thomas King',
        durationSeconds: 5400,
        ageRestriction: 18,
        releaseYear: 2021,
        createdAt: '2024-01-01T19:30:00Z',
    },
    {
        id: 3,
        title: 'Secrets in the City',
        description: 'In the urban jungle of New York City, "Secrets in the City" reveals the hidden lives of ordinary people with extraordinary secrets. This intense drama explores the themes of trust, betrayal, and redemption as multiple storylines intersect in unexpected ways. Directed by Sophia Carter, the film showcases a stellar ensemble cast and a plot full of twists and turns that will leave viewers on the edge of their seats until the final reveal.',
        director: 'Sophia Carter',
        durationSeconds: 5400,
        ageRestriction: 16,
        releaseYear: 2019,
        createdAt: '2024-01-01T18:00:00Z',
    },
    {
        id: 4,
        title: 'The Last Stand',
        description: 'In "The Last Stand", a group of survivors must band together to defend their town against a horde of ravenous zombies. As the undead close in, tensions rise, and the group must confront their fears and past traumas to survive. Director Sarah Johnson expertly blends horror, action, and drama in this pulse-pounding thriller that will keep viewers on the edge of their seats until the final frame.',
        director: 'Sarah Johnson',
        durationSeconds: 6300,
        ageRestriction: 18,
        releaseYear: 2022,
        createdAt: '2024-01-01T20:00:00Z',
    },
    {
        id: 5,
        title: 'The Lost City',
        description: 'In "The Lost City", a team of explorers embarks on a perilous journey to uncover the secrets of a long-lost civilization. As they navigate treacherous jungles, ancient ruins, and deadly traps, they must rely on their wits and courage to survive. Director Alex Thompson crafts a thrilling adventure that combines action, mystery, and suspense in equal measure, keeping viewers guessing until the very end.',
        director: 'Alex Thompson',
        durationSeconds: 6000,
        ageRestriction: 12,
        releaseYear: 2023,
        createdAt: '2024-01-01T21:00:00Z',
    },
    {
        id: 6,
        title: 'The Final Reckoning',
        description: 'In "The Final Reckoning", a detective must solve a series of gruesome murders that lead him on a dark and twisted journey into the heart of the criminal underworld. As he uncovers the truth behind the killings, he must confront his own demons and make difficult choices that will determine the fate of the city. Director James Lee weaves a complex and gripping tale of mystery, suspense, and redemption that will keep viewers guessing until the final frame.',
        director: 'James Lee',
        durationSeconds: 6600,
        ageRestriction: 16,
        releaseYear: 2021,
        createdAt: '2024-01-01T22:00:00Z',
    },
    {
        id: 7,
        title: 'The Dark Forest',
        description: 'In "The Dark Forest", a group of friends embark on a camping trip in a remote forest, only to discover that they are not alone. As they are hunted by a malevolent force, they must rely on their wits and courage to survive the night. Director Emma White crafts a tense and atmospheric horror film that will keep viewers on the edge of their seats until the final, chilling frame.',
        director: 'Emma White',
        durationSeconds: 5700,
        ageRestriction: 18,
        releaseYear: 2020,
        createdAt: '2024-01-01T23:00:00Z',
    }
];

const episodes = [
    {
        id: 1,
        title: 'Episode 1 - The Secret',
        description: 'The protagonist discovers a shocking family secret.',
        durationSeconds: 2700,
        ageRestriction: 14,
        releaseYear: '2024',
        contentID: 1,
        season: 1,
        episodeNumber: 1,
        createdAt: '2024-01-01T16:00:00Z'
    },
    {
        id: 2,
        title: 'Episode 2 - The Fallout',
        description: 'Consequences of the family secret begin to unfold.',
        durationSeconds: 2700,
        ageRestriction: 14,
        releaseYear: '2024',
        contentID: 1,
        season: 1,
        episodeNumber: 2,
        createdAt: '2024-01-02T16:00:00Z'
    },
    {
        id: 3,
        title: 'Episode 1 - New Beginnings',
        description: 'The family starts a new chapter in life.',
        durationSeconds: 2700,
        ageRestriction: 12,
        releaseYear: '2024',
        contentID: 2,
        season: 1,
        episodeNumber: 1,
        createdAt: '2024-01-03T17:00:00Z'
    },
    {
        id: 4,
        title: 'Episode 3 - The Revelation',
        description: 'A new revelation changes everything.',
        durationSeconds: 2700,
        ageRestriction: 14,
        releaseYear: '2024',
        contentID: 1,
        season: 1,
        episodeNumber: 3,
        createdAt: '2024-01-03T16:00:00Z'
    },
    {
        id: 5,
        title: 'Episode 2 - The Challenge',
        description: 'The family faces a new challenge.',
        durationSeconds: 2700,
        ageRestriction: 12,
        releaseYear: '2024',
        contentID: 2,
        season: 1,
        episodeNumber: 2,
        createdAt: '2024-01-04T17:00:00Z'
    }
];


const card = tv({
    slots: {
        containerMain: 'w-full h-full py-4 px-4 md:px-6 lg:px-8 2xl:px-16',
        containerFlex: 'flex justify-between items-center w-full',
        containerGrid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 w-full h-full mt-4 gap-4',
        titleCategory: 'text-lg font-oswald font-medium text-slate-400'
    }
});

const { containerMain, containerFlex, containerGrid, titleCategory, buttonFilter, iconFilter } = card();

function GridDisplay() {
    return (
        <div className={containerMain()}>
            <div className={containerFlex()}>
                <h1 className={titleCategory()}>
                    Programação
                </h1>

                <ButtonFilter />
            </div>

            <div className={containerGrid()}>
                {series.map((item) => (
                    <ContainerDisplay key={item.id} item={item} />
                ))}

                {movies.map((item) => (
                    <ContainerDisplay key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default GridDisplay;