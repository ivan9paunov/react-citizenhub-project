import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import archivedAPI from "../api/archived-api.js";

export function useGetAllArchived(filterValues, page) {
    const [archived, setArchived] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { archived, pages } = await archivedAPI.getAll(filterValues, page);

                setArchived(archived);
                setTotalPages(pages);
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
    }, [filterValues, page]);

    return {
        archived,
        totalPages,
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
    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false);
            }
        })();
    }, [reportId]);

    return {
        archive,
        setArchive,
        isLoading
    };
};