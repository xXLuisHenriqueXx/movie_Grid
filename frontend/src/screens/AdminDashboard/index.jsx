import React, { useEffect, useState } from 'react';
import tokenService from '../../services/tokenService';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [hasAdminToken, setHasAdminToken] = useState(false);

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        const navigation = useNavigate();

        const { status, isAdmin } = await tokenService.validateTokenRoute();

        if (status === 200 && isAdmin) setHasAdminToken(true);
        else setHasAdminToken(false);

        if (!hasAdminToken) navigation('/');
  };

    return (

        <div className='
            flex justify-center items-center min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950
        '>

        </div>
    )
}

export default AdminDashboard;