import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function UserGuard() {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated
        ? <Navigate to="/" />
        : <Outlet />;
}