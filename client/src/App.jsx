import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import ReportList from "./components/report-list/ReportList.jsx";

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<ReportList />} />
            </Routes>
            
            <Footer />
        </>
    );
}

export default App;
