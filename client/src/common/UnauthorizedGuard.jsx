import { Navigate, Outlet } from "react-router-dom";
import reportsAPI from "../api/reports-api.js";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default async function UnauthorizedGuard() {
    const { userId } = useAuthContext();

    if (!userId) {
        <Navigate to={'/'} />
    }

    const { reportId } = useParams();

    let isOwner = false;

    const report = await reportsAPI.getOne(reportId);
    console.log(report);
    
    if (report) {
        isOwner = reportId == userId;
    }
    console.log(isOwner);
    
    return isOwner
        ? <Outlet />
        : <Navigate to={`/reports/${reportId}/details`} />
}