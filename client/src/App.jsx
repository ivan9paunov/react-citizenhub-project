import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import ReportList from "./components/report-list/ReportList.jsx";
import ReportDetails from "./components/report-details/ReportDetails.jsx";
import ArchiveList from "./components/archive-list/ArchiveList.jsx";
import NewReport from "./components/new-report/NewReport.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import { AuthContext } from "./contexts/AuthContext.js";

function App() {
    const [authState, setAuthState] = useState({});

    const changeAuthState =(state) => {
        setAuthState(state);
    };

    const contextData = {
        userId: authState._id,
        email: authState.email,
        accessToken: authState.accessToken,
        isAuthenticated: !!authState.email,
        changeAuthState
    };

    return (
        <AuthContext.Provider value={contextData}>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<ReportList />} />
                <Route path="/reports/:reportId/details" element={<ReportDetails />} />
                <Route path="/archived" element={<ArchiveList />} />
                <Route path="/report-it" element={<NewReport />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />
        </AuthContext.Provider>
    );
}

export default App;
