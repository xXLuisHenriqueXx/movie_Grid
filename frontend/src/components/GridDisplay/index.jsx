import React, { useEffect, useState } from 'react';
import ContainerDisplay from './ContainerDisplay';
import { tv } from 'tailwind-variants';
import ButtonFilter from './ButtonFilter';
import ContentService from '../../services/contentService';

const card = tv({
    slots: {
        containerMain: 'w-full h-full py-4 px-4 md:px-6 lg:px-8 2xl:px-16',
        containerFlex: 'flex justify-between items-center w-full',
        containerGrid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 w-full h-full mt-4 gap-4',
        titleCategory: 'text-lg font-oswald font-medium text-slate-400'
    }
});

const { containerMain, containerFlex, containerGrid, titleCategory } = card();

function GridDisplay() {
    const [tvShows, setTvShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [soapOperas, setSoapOperas] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const tvShowsResponse = await ContentService.getAllTVShows();
        const moviesResponse = await ContentService.getAllMovies();
        const soapOperasResponse = await ContentService.getAllSoapOperas();

        if (tvShowsResponse.status === 200) setTvShows(tvShowsResponse.data.tvShows);
        if (moviesResponse.status === 200) setMovies(moviesResponse.data.movies);
        if (soapOperasResponse.status === 200) setSoapOperas(soapOperasResponse.data.soapOperas);
    }

    return (
        <div className={containerMain()}>
            <div className={containerFlex()}>
                <h1 className={titleCategory()}>
                    Programação
                </h1>

                <ButtonFilter />
            </div>

            <div className={containerGrid()}>
                {tvShows.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={"Serie"} />
                ))}

                {movies.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={"Movie"} />
                ))}

                {soapOperas.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={"Serie"} />
                ))}
            </div>
        </div>
    )
}

export default GridDisplay;