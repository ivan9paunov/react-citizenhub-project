import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import archivedAPI from "../api/archived-api.js";

export function useGetAllArchived() {
    const [archived, setArchived] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await archivedAPI.getAll();

                setArchived(result);
            } catch (err) {
                if (err.code.toString().startsWith('4')) {
                    navigate('/404');
                    throw new Error(err.message);
                }

                if (err.code.toString().startsWith('5')) {
                    navigate('/server-error');
                    throw new Error(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        archived,
        isLoading
    }
};

export function useGetOneArchive(reportId) {
    const [archive, setArchive] = useState({
        topic: '',
        title: '',
        location: '',
        description: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await archivedAPI.getOne(reportId);

                setArchive(result);
            } catch (err) {
                if (err.code.toString().startsWith('4')) {
                    navigate('/404');
                    throw new Error(err.message);
                }

                if (err.code.toString().startsWith('5')) {
                    navigate('/server-error');
                    throw new Error(err.message);
                }
            }
        })();
    }, [reportId]);

    return [
        archive,
        setArchive
    ];
};