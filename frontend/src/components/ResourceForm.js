// src/components/ResourceForm.jsx
import { useState } from "react";

export default function ResourceForm({ onResourceAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        country: "",
        contact: "",
        available: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/resources", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Resource submitted!");
                setFormData({ name: "", type: "", country: "", contact: "", available: true });
                onResourceAdded(); // ✅ refresh table
            } else {
                alert("Submission failed");
            }
        } catch (err) {
            console.error("Error submitting resource", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Resource</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Resource Name" value={formData.name} onChange={handleChange}
                       className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white" required />
                <input type="text" name="type" placeholder="Type (Helpline, Hospital, etc)" value={formData.type} onChange={handleChange}
                       className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white" required />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange}
                       className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white" required />
                <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange}
                       className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white" required />
                <label className="flex items-center col-span-2">
                    <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="mr-2" />
                    <span className="text-black dark:text-white">Available</span>
                </label>
            </div>
            <button type="submit"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
                Submit
            </button>
        </form>
    );
}