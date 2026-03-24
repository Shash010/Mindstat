import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure this path is correct

export default function Navbar({ toggleDark, isDark }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/");
    };

    const handleHomeClick = () => {
        if (token) {
            const confirmLogout = window.confirm(
                "You are currently logged in. Going Home will log you out. Are you sure?"
            );
            if (confirmLogout) {
                localStorage.removeItem("token");
                navigate("/");
            }
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="bg-pink-100 text-black dark:bg-pink-800 dark:text-white px-4 py-2 flex justify-between items-center h-16">
        {/* Logo + Title with link */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHomeClick}>
                <img
                    src={logo}
                    alt="MindStat Logo"
                    className="h-10 w-10 object-cover" // keep height fixed to prevent nav bar expansion
                />
                <h1 className="text-2xl font-bold leading-none">MindStat</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
                <button
                    onClick={handleHomeClick}
                    className="hover:text-pink-600 bg-transparent border-none cursor-pointer"
                >
                    Home
                </button>

                {!token && (
                    <>
                        <Link to="/register" className="hover:text-pink-600">Register</Link>
                        <Link to="/login" className="hover:text-pink-600">Login</Link>
                    </>
                )}

                {token && (
                    <>
                        <Link to="/dashboard" className="hover:text-pink-600">Dashboard</Link>
                        <Link to="/resources" className="hover:text-pink-600">Resources</Link>
                        <Link to="/survey" className="hover:text-pink-600">Survey</Link>
                        <Link to="/articles" className="hover:text-pink-600">Articles</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-1 rounded-full transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {/* Dark Mode Toggle */}
                <div className="flex items-center space-x-2 ml-2">
                    <span className="text-sm">{isDark ? "🌙" : "☀️"}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isDark}
                            onChange={toggleDark}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500">
                        </div>
                    </label>
                </div>
            </div>
        </nav>
    );
}