import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                navigate("/dashboard");
            } else {
                setError(data.msg || "Login failed");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <h2 className="text-3xl font-bold mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
                    required
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>

                {/* Add "Don't have an account? Register here" link */}
                <div className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-pink-600 hover:underline cursor-pointer"
                    >
            Register here
          </span>
                </div>
            </form>
        </div>
    );
}