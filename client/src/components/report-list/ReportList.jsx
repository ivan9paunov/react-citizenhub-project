import { useEffect, useState } from "react";
import reportsAPI from "../../api/reports-api.js";
import ReportListItem from "./report-list-item/ReportListItem.jsx";


export default function ReportList() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        reportsAPI.getAll()
        .then(result => setReports(result));
    }, []);

    return (
        <div className="container-fluid p-5">
            <div className="mb-5 text-center">
                <h5 className="text-primary text-uppercase">Reports</h5>
                <h1 className="display-3 text-uppercase mb-0">Open Cases</h1>
            </div>
            <div className="row g-5">
                {reports.map(report => <ReportListItem key={report._id} {...report} />)}
            </div>
        </div>
    );
}