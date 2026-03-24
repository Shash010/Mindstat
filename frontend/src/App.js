import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SurveyForm from "./pages/SurveyForm.tsx";// ✅ NEW: Import SurveyForm component
import ArticlesPage from "./pages/Articles.tsx";

function App() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <Router>
            <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
                <Navbar toggleDark={() => setIsDark(!isDark)} isDark={isDark} />
                <div className="p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/survey" element={<SurveyForm />} /> {/* ✅ NEW Route */}
                        <Route path="/articles" element={<ArticlesPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;