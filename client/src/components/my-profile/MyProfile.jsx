import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import MyReports from "./my-reports/MyReports.jsx";
import MyArchives from "./my-archives/MyArchives.jsx";
import PageNotFound from "../page-not-found/PageNotFound.jsx";

export default function MyProfile() {
    const { username } = useAuthContext();
    const location = useLocation();

    const path = location.pathname.split('/')[2];

    return (
        <div className="container-fluid p-5">
            <div className="mb-4 text-center">
                <h3 className="text-primary text-uppercase">{`Welcome to your profile page, ${username}`}</h3>
                <h1 className="display-3 text-uppercase mb-0">See your publications</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="btn-group w-100" role="group">
                        {path == 'reports'
                            ? (
                                <>
                                    <Link to={`/profile/reports`} className="btn btn-primary custom-btn py-3 mx-1">REPORTS</Link>
                                    <Link to={`/profile/archived`} className="btn btn-secondary custom-btn py-3 mx-1">ARCHIVED</Link>
                                </>
                            ) : (
                                <>
                                    <Link to={`/profile/reports`} className="btn btn-secondary custom-btn py-3 mx-1">REPORTS</Link>
                                    <Link to={`/profile/archived`} className="btn btn-primary custom-btn py-3 mx-1">ARCHIVED</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {path == 'reports'
                ? <MyReports />
                : path == 'archived'
                    ? <MyArchives />
                    : <PageNotFound />
            }
        </div>
    );
}