import { Filter } from 'lucide-react';
import React from 'react';
import ContainerDisplay from './ContainerDisplay';
import { tv } from 'tailwind-variants';

const tvShows = [
    {
        id: 1,
        title: 'Morning News',
        description: 'The "Morning News" delivers an in-depth review of the day’s most important national and international headlines. From politics to economics, and from weather updates to cultural segments, the show keeps viewers informed about the latest developments. With interviews from leading experts and real-time reporting from the field, the show is a trusted source of information for millions of early risers.',
        owner: 'John Smith',
        durationSeconds: 3600,
        ageRestriction: 'L',
        releaseYear: '2023',
        createdAt: '2024-01-01T08:00:00Z'
    },
    {
        id: 2,
        title: 'Cooking with Chef Anna',
        description: 'In "Cooking with Chef Anna", renowned chef Anna Martinez shares her most delicious and innovative recipes. Each episode walks viewers through the step-by-step process of creating gourmet dishes at home. From exotic international cuisine to traditional comfort foods, Chef Anna combines flavors in surprising ways. Her kitchen is always bustling with energy, and the show offers great tips for both novice and experienced cooks alike.',
        owner: 'Anna Martinez',
        durationSeconds: 3600,
        ageRestriction: 'L',
        releaseYear: '2022',
        createdAt: '2024-01-01T09:00:00Z'
    },
    {
        id: 3,
        title: 'Tech Today',
        description: 'As the world of technology evolves at a rapid pace, "Tech Today" keeps viewers up to date on the latest gadgets, software, and innovations shaping our lives. Hosted by tech enthusiast Jason Lee, the show provides insightful reviews, interviews with industry leaders, and hands-on demos of cutting-edge technology. From smartphones to artificial intelligence, every aspect of modern tech is explored with clarity and expertise.',
        owner: 'Jason Lee',
        durationSeconds: 3600,
        ageRestriction: '12',
        releaseYear: '2023',
        createdAt: '2024-01-01T10:00:00Z'
    },
    {
        id: 4,
        title: 'Science Explorers',
        description: 'Join "Science Explorers" on a fascinating journey through the world of scientific discovery. Hosted by Dr. Emily Chen, this educational program captivates curious minds with hands-on experiments, groundbreaking research, and interviews with leading scientists. Each episode delves into a different field of science, from biology and chemistry to space exploration and environmental studies, making complex topics accessible and fun for children and adults alike.',
        owner: 'Dr. Emily Chen',
        durationSeconds: 2700,
        ageRestriction: '10',
        releaseYear: '2021',
        createdAt: '2024-01-01T11:00:00Z'
    },
    {
        id: 5,
        title: 'Sports Roundup',
        description: 'Get your daily fix of sports action with "Sports Roundup", the go-to show for all things related to sports. Host David Miller brings you the latest scores, game highlights, and interviews with the biggest stars in the world of athletics. Whether it’s football, basketball, tennis, or motorsports, "Sports Roundup" covers it all with in-depth analysis, exclusive behind-the-scenes footage, and expert predictions for upcoming matches.',
        owner: 'David Miller',
        durationSeconds: 3600,
        ageRestriction: '16',
        releaseYear: '2023',
        createdAt: '2024-01-01T12:00:00Z'
    }
];

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
    }
];

const soapOperas = [
    {
        id: 1,
        title: 'Love and Betrayal',
        description: 'Set in the glamorous world of high society, "Love and Betrayal" tells the gripping story of powerful families whose relationships are tested by secrets, lies, and illicit affairs. At the center of the drama is a love triangle that threatens to destroy generations of trust. This epic saga spans over a hundred episodes, each filled with unexpected plot twists and emotional confrontations. Viewers are drawn into a world where love is never simple, and loyalty is a rare commodity.',
        owner: 'Emily Harris',
        numberEpisodes: 150,
        ageRestriction: '14',
        releaseYear: '2018',
        type: 'Drama',
        createdAt: '2024-01-01T16:00:00Z'
    },
    {
        id: 2,
        title: 'Family Ties',
        description: 'In a small town full of charm and hidden mysteries, "Family Ties" explores the lives of a close-knit family facing challenges that test their strength and unity. From financial struggles to family secrets and health crises, each episode delves deeper into the emotional lives of the characters. The series portrays the everyday joys and heartbreaks of family life with sensitivity, offering viewers a chance to see themselves in the trials of the fictional family.',
        owner: 'James White',
        numberEpisodes: 120,
        ageRestriction: '12',
        releaseYear: '2020',
        type: 'Family Drama',
        createdAt: '2024-01-01T17:00:00Z'
    }
];

const soapOperaEpisodes = [
    {
        id: 1,
        title: 'Episode 1 - The Secret',
        description: 'The protagonist discovers a shocking family secret.',
        durationSeconds: 2700,
        ageRestriction: '14',
        soapOperaId: 1,
        createdAt: '2024-01-01T16:00:00Z'
    },
    {
        id: 2,
        title: 'Episode 2 - The Fallout',
        description: 'Consequences of the family secret begin to unfold.',
        durationSeconds: 2700,
        ageRestriction: '14',
        soapOperaId: 1,
        createdAt: '2024-01-02T16:00:00Z'
    },
    {
        id: 3,
        title: 'Episode 1 - New Beginnings',
        description: 'The family starts a new chapter in life.',
        durationSeconds: 2700,
        ageRestriction: '12',
        soapOperaId: 2,
        createdAt: '2024-01-03T17:00:00Z'
    }
];


const card = tv({
    slots: {
        containerMain: 'w-full h-full py-4 px-4 md:px-6 lg:px-8',
        containerFlex: 'flex justify-between items-center w-full',
        containerGrid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full mt-4 gap-4',
        titleCategory: 'text-lg font-oswald font-medium text-slate-400',
        buttonFilter: 'flex flex-row items-center px-4 py-1 bg-slate-800 hover:bg-slate-700 transition-all duration-300 text-white rounded-md cursor-pointer',
        iconFilter: 'w-4 h-4 ml-2'
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

                <button onClick={() => {}} className={buttonFilter()}>
                    Filtrar
                    <Filter className={iconFilter()} /> 
                </button>
            </div>

            <div className={containerGrid()}>
                {tvShows.map((item) => (
                    <ContainerDisplay key={item.id} item={item} />
                ))}

                {movies.map((item) => (
                    <ContainerDisplay key={item.id} item={item} />
                ))}

                {soapOperas.map((item) => (
                    <ContainerDisplay key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default GridDisplay;