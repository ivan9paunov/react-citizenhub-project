import { useEffect, useState } from "react";
import reportsAPI from "../api/reports-api.js";

export function useGetAllReports() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await reportsAPI.getAll();

                setReports(result);
            } catch (error) {
                alert(error.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        reports,
        isLoading
    }
};

export function useGetOneReport(reportId) {
    const [report, setReport] = useState({
        topic: '',
        title: '',
        location: '',
        description: ''
    });

    useEffect(() => {
        (async () => {
            const result = await reportsAPI.getOne(reportId);

            setReport(result);
        })();
    }, [reportId]);

    return [
        report,
        setReport
    ];
};

export function useCreateReport() {
    const reportCreateHandler = (reportData) => reportsAPI.create(reportData);

    return reportCreateHandler;
}