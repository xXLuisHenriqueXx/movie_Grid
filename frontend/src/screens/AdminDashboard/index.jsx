import React, { useEffect, useState } from 'react';
import tokenService from '../../services/tokenService';
import { useNavigate } from 'react-router-dom';
import DashboardTable from '../../components/DashboardTable';
import ContentService from '../../services/contentService';

const Separator = () => {
    return (
        <hr className='
            w-full bg-gray-900 my-4
        '/>
    )
}

function AdminDashboard() {
    const [hasAdminToken, setHasAdminToken] = useState(false);
    const [tvShows, setTvShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [soapOperas, setSoapOperas] = useState([]);

    const [showModalMovie, setShowModalMovie] = useState(false);
    const [showModalTvShow, setShowModalTvShow] = useState(false);
    const [showModalSoapOpera, setShowModalSoapOpera] = useState(false);

    useEffect(() => {
        validateToken();
        loadData();
    }, []);

    const validateToken = async () => {
        const navigation = useNavigate();

        const { status, isAdmin } = await tokenService.validateTokenRoute();

        if (status === 200 && isAdmin) setHasAdminToken(true);
        else setHasAdminToken(false);

        if (!hasAdminToken) navigation('/');
    };

    const loadData = async () => {
        const tvShowsResponse = await ContentService.getAllTVShows();
        const moviesResponse = await ContentService.getAllMovies();
        const soapOperasResponse = await ContentService.getAllSoapOperas();

        if (tvShowsResponse.status === 200) setTvShows(tvShowsResponse.data);
        if (moviesResponse.status === 200) setMovies(moviesResponse.data);
        if (soapOperasResponse.status === 200) setSoapOperas(soapOperasResponse.data);
    }

    return (
        <div className='
            flex justify-center items-center min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950
        '>
            <div className='
                flex flex-col justify-center items-center w-11/12 h-5/6 p-2 bg-gray-800 bg-opacity-90 rounded-md shadow-lg
            '>
                <h1 className='
                  text-xl font-bold text-gray-200 mt-2 mb-4
                '>
                    Dashboard
                </h1>

                <DashboardTable title={"Programas de TV"} type={"TVShow"} data={tvShows} setShowModal={setShowModalTvShow} showModal={showModalTvShow} />

                <Separator />

                <DashboardTable title={"Novelas"} type={'SoapOpera'} data={soapOperas} setShowModal={setShowModalSoapOpera} showModal={showModalSoapOpera} />
                <Separator />

                <DashboardTable title={"Filmes"} type={'Movie'} data={movies} setShowModal={setShowModalMovie} showModal={showModalMovie} />
            </div>
        </div>
    )
}

export default AdminDashboard;