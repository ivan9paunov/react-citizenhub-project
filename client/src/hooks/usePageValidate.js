import { useEffect } from "react";

export function usePageValidate(page, totalPages, navigate, setCurrentPage, path) {
    useEffect(() => {
        if (page > totalPages) {
            navigate(`/${path}`);
        } else {
            setCurrentPage(page);
        }
    }, [page, totalPages, navigate]);
};