import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import ReportList from "./components/report-list/ReportList.jsx";
import ArchiveList from "./components/archive-list/ArchiveList.jsx";

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<ReportList />} />
                <Route path="/archived" element={<ArchiveList />} />
            </Routes>
            
            <Footer />
        </>
    );
}

export default App;
