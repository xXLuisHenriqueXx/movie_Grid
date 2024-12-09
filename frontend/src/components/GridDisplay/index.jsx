import React, { useEffect, useState } from 'react';
import ContainerDisplay from './ContainerDisplay';
import { tv } from 'tailwind-variants';
import ButtonFilter from './ButtonFilter';
import ContentService from '../../services/contentService';
import tokenService from '../../services/tokenService';

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
    const [tags, setTags] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [hasUserToken, setHasUserToken] = useState(false);

    useEffect(() => {
        loadData();
        validateToken();
    }, []);

    const loadData = async () => {
        const tvShowsResponse = await ContentService.getAllTVShows();
        const moviesResponse = await ContentService.getAllMovies();
        const soapOperasResponse = await ContentService.getAllSoapOperas();
        const tagsResponse = await ContentService.getAllTags();

        if (tvShowsResponse.status === 200) setTvShows(tvShowsResponse.data.tvShows);
        if (moviesResponse.status === 200) setMovies(moviesResponse.data.movies);
        if (soapOperasResponse.status === 200) setSoapOperas(soapOperasResponse.data.soapOperas);
        if (tagsResponse.status === 200) setTags(tagsResponse.data.tags);
    }

    const validateToken = async () => {
        const { status, isAdmin } = await tokenService.validateTokenRoute();

        if (status === 200 && !isAdmin) setHasUserToken(true);
        else setHasUserToken(false);
    };

    const handleFilter = async (tagFilter, typeFilter) => {
        const response = await ContentService.getContentByTag(tagFilter, typeFilter);
        console.log(response);

        if (response.status === 200) setFilteredData(response.data.content);
    }

    return (
        <div className={containerMain()}>
            <div className={containerFlex()}>
                <h1 className={titleCategory()}>
                    Programação
                </h1>

                <ButtonFilter tags={tags} handleFilter={handleFilter} setFilteredData={setFilteredData} />
            </div>

            <div className={containerGrid()}>
                {!filteredData && tvShows.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={"Series"} hasUserToken={hasUserToken} />
                ))}

                {!filteredData && movies.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={"Movie"} hasUserToken={hasUserToken} />
                ))}

                {!filteredData && soapOperas.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={"Series"} hasUserToken={hasUserToken} />
                ))}

                {filteredData && filteredData.map((item) => (
                    <ContainerDisplay key={item.id} item={item} type={item.type} hasUserToken={hasUserToken} />
                ))}
            </div>
        </div>
    )
}

export default GridDisplay;