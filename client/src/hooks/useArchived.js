import { useEffect, useState } from "react";
import archivedAPI from "../api/archived-api.js";

export function useGetAllArchived() {
    const [archived, setArchived] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await archivedAPI.getAll();

                setArchived(result);
            } catch (error) {
                alert(error.message);
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

    useEffect(() => {
        (async () => {
            const result = await archivedAPI.getOne(reportId);

            setArchive(result);
        })();
    }, [reportId]);

    return [
        archive,
        setArchive
    ];
};