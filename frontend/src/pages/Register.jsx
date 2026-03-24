import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
            const response = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                setError(data.msg || "Registration failed");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <h2 className="text-3xl font-bold mb-6">Register</h2>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
                    required
                />
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
                    Register
                </button>

                {/* Add "Already have an account? Login here" link */}
                <div className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-pink-600 hover:underline cursor-pointer"
                    >
            Login here
          </span>
                </div>
            </form>
        </div>
    );
}