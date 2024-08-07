import { useState, useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import reportsAPI from '../api/reports-api.js';
import { useAuthContext } from '../contexts/AuthContext.jsx';
import Spinner from '../components/spinner/Spinner.jsx';

export default function UnauthorizedGuard() {
    const { userId } = useAuthContext();
    const { reportId } = useParams();
    const [isOwner, setIsOwner] = useState(null);

    useEffect(() => {
        const checkOwnership = async () => {
            if (!userId) {
                setIsOwner(false);
                return;
            }

            try {
                const report = await reportsAPI.getOne(reportId);
                setIsOwner(report && report._ownerId === userId);
            } catch (error) {
                console.error('Error fetching report:', error);
                setIsOwner(false);
            }
        };

        checkOwnership();
    }, [userId, reportId]);

    if (isOwner === null) {
        return <Spinner />;
    }

    return isOwner
        ? <Outlet />
        : <Navigate to={`/reports/${reportId}/details`} />;
}
