import { useEffect, useState } from "react";

import reportsAPI from "../api/reports-api.js";
import { useNavigate } from "react-router-dom";

export function useGetAllReports() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await reportsAPI.getAll();

                setReports(result);
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
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await reportsAPI.getOne(reportId);
    
                setReport(result);
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
        report,
        setReport
    ];
};

export function useCreateReport() {
    const reportCreateHandler = (reportData) => reportsAPI.create(reportData);

    return reportCreateHandler;
}