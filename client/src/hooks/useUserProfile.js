import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import reportsAPI from "../api/user-profile-api.js";

export function useGetAllReports(userId, collection, filterValues, page) {
    const [reports, setReports] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { reports, pages } = await reportsAPI.getAll(userId, collection, filterValues, page);

                setReports(reports);
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
        reports,
        totalPages,
        isLoading
    }
};