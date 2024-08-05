import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import ReportList from "./components/report-list/ReportList.jsx";
import ReportDetails from "./components/report-details/ReportDetails.jsx";
import ReportAdd from "./components/report-add/ReportAdd.jsx";
import ReportEdit from "./components/report-edit/ReportEdit.jsx";
import ArchiveList from "./components/archive-list/ArchiveList.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Logout from "./components/logout/Logout.jsx";
import ArchiveDetails from "./components/archive-details/ArchiveDetails.jsx";

import "../public/css/style.css";
import PageNotFound from "./components/page-not-found/PageNotFound.jsx";

function App() {
    return (
        <AuthContextProvider>
            <div id="page-container">
                <Header />
                <div id="content-wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/reports" element={<ReportList />} />
                        <Route path="/reports/:reportId/details" element={<ReportDetails />} />
                        <Route path="/reports/:reportId/edit" element={<ReportEdit />} />
                        <Route path="/archived" element={<ArchiveList />} />
                        <Route path="/archived/:archiveId/details" element={<ArchiveDetails />} />
                        <Route path="/report-it" element={<ReportAdd />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </AuthContextProvider>
    );
}

export default App;
