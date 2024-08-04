import { useGetAllArchived } from "../../hooks/useArchived.js";
import ArchiveListItem from "./archive-list-item/ArchiveListItem.jsx";
import Spinner from "../spinner/Spinner.jsx";

export default function ArchiveList() {
    const { archived, isLoading } = useGetAllArchived();

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
                        ? archived.map(archive => <ArchiveListItem key={archive._id} {...archive} />)
                        : <h3 className="display-3 text-uppercase text-center mb-0" style={{ color: "#FB5B21" }}>No issues resolved</h3>
                }
            </div>
        </div>
    );
}