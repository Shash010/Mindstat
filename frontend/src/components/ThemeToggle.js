import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    const toggleTheme = () => {
        const root = document.documentElement;
        if (root.classList.contains("dark")) {
            root.classList.remove("dark");
            setIsDark(false);
        } else {
            root.classList.add("dark");
            setIsDark(true);
        }
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded"
        >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}