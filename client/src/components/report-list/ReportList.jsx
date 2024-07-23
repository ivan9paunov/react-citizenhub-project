import { useEffect, useState } from "react";
import reportsAPI from "../../api/reports-api.js";
import ReportListItem from "./report-list-item/ReportListItem.jsx";
import Spinner from "../spinner/Spinner.jsx";


export default function ReportList() {
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

    return (
        <div className="container-fluid p-5">
            <div className="mb-5 text-center">
                <h5 className="text-primary text-uppercase">Reports</h5>
                <h1 className="display-3 text-uppercase mb-0">Open Cases</h1>
            </div>
            <div className="row g-5">
                {isLoading
                    ? <Spinner />
                    : reports.length > 0
                        ? reports.map(report => <ReportListItem key={report._id} {...report} />)
                        : <h3 className="display-3 text-uppercase text-center mb-0" style={{ color: "#FB5B21" }}>No current issues</h3>
                }
            </div>
        </div>
    );
}