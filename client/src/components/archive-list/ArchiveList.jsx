import { useEffect, useState } from "react";

import archivedAPI from "../../api/archived-api.js";

import ReportListItem from "../report-list/report-list-item/ReportListItem.jsx";
import Spinner from "../spinner/Spinner.jsx";


export default function ArchiveList() {
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

    return (
        <div className="container-fluid p-5">
            <div className="mb-5 text-center">
                <h5 className="text-primary text-uppercase">Reports</h5>
                <h1 className="display-3 text-uppercase mb-0">Archived Cases</h1>
            </div>
            <div className="row g-5">
                {isLoading
                    ? <Spinner />
                    : archived.length > 0
                        ? archived.map(archive => <ReportListItem key={archive._id} {...archive} />)
                        : <h3 className="display-3 text-uppercase text-center mb-0" style={{ color: "#FB5B21" }}>No issues resolved</h3>
                }
            </div>
        </div>
    );
}