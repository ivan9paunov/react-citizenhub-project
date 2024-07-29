import ReportListItem from "./report-list-item/ReportListItem.jsx";
import Spinner from "../spinner/Spinner.jsx";
import { useGetAllReports } from "../../hooks/useReports.js";


export default function ReportList() {
    const { reports, isLoading } = useGetAllReports();
    
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