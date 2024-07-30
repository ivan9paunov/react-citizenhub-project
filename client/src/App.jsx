import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import ReportList from "./components/report-list/ReportList.jsx";
import ReportDetails from "./components/report-details/ReportDetails.jsx";
import ArchiveList from "./components/archive-list/ArchiveList.jsx";
import NewReport from "./components/new-report/NewReport.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Logout from "./components/logout/Logout.jsx";

function App() {
    return (
        <AuthContextProvider>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<ReportList />} />
                <Route path="/reports/:reportId/details" element={<ReportDetails />} />
                <Route path="/archived" element={<ArchiveList />} />
                <Route path="/report-it" element={<NewReport />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

            <Footer />
        </AuthContextProvider>
    );
}

export default App;
