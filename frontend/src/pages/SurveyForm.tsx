import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const dropdownOptions: Record<string, string[]> = {
    Gender: ["Female", "Male"],
    Occupation: ["Business", "Corporate", "Housewife", "Others", "Student"],
    self_employed: ["No", "Unknown", "Yes"],
    family_history: ["No", "Yes"],
    treatment: ["No", "Yes"],
    Days_Indoors: [
        "1-14 days",
        "15-30 days",
        "31-60 days",
        "Go out Every day",
        "More than 2 months",
    ],
    Growing_Stress: ["Maybe", "No", "Yes"],
    Changes_Habits: ["Maybe", "No", "Yes"],
    Mental_Health_History: ["Maybe", "No", "Yes"],
    Mood_Swings: ["High", "Low", "Medium"],
    Coping_Struggles: ["No", "Yes"],
    Work_Interest: ["Maybe", "No", "Yes"],
    Social_Weakness: ["Maybe", "No", "Yes"],
    mental_health_interview: ["Maybe", "No", "Yes"],
    care_options: ["No", "Not sure", "Yes"],
    Mood_Swings_Encoded: ["1", "2", "3"],
    Year: ["2025"],
    Month: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
    Country: [
        "Australia",
        "Austria",
        "Belgium",
        "Brazil",
        "Canada",
        "France",
        "Germany",
        "India",
        "Ireland",
        "Italy",
        "Mexico",
        "Netherlands",
        "New Zealand",
        "Poland",
        "Portugal",
        "Singapore",
        "South Africa",
        "Spain",
        "Sweden",
        "Switzerland",
        "United Kingdom",
        "United States",
    ],
};

const allFields = Object.keys(dropdownOptions);
const defaultForm = Object.fromEntries(allFields.map((key) => [key, ""]));

const SurveyForm: React.FC = () => {
    const [formData, setFormData] = useState<Record<string, string>>(defaultForm);
    const [responses, setResponses] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing
            ? `http://localhost:5000/survey/${formData.id}`
            : "http://localhost:5000/survey";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert(isEditing ? "Updated" : "Submitted");
                fetchResponses();
                setFormData(defaultForm);
                setIsEditing(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchResponses = async () => {
        try {
            const res = await fetch("http://localhost:5000/survey", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await res.json();
            setResponses(data);
        } catch (err) {
            console.error("Fetch failed", err);
        }
    };

    const handleEdit = (entry: any) => {
        setFormData(entry);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        const res = await fetch(`http://localhost:5000/survey/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (res.ok) {
            alert("Deleted");
            fetchResponses();
        }
    };

    useEffect(() => {
        fetchResponses();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">
                {isEditing ? "✏️ Edit Survey" : "🧠 Mental Health Survey"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
            >
                {allFields.map((field) => (
                    <div key={field}>
                        <label className="block mb-1 font-medium capitalize">
                            {field.replaceAll("_", " ")}
                        </label>
                        <select
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                            required
                        >
                            <option value="">Select {field}</option>
                            {dropdownOptions[field].map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className="md:col-span-2 text-center pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                    >
                        {isEditing ? "Update Response" : "Submit Survey"}
                    </button>
                </div>
            </form>

            <h3 className="text-2xl font-semibold mt-12 text-center">📊 Your Responses</h3>
            <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm border rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        {allFields.map((key) => (
                            <th key={key} className="border px-2 py-1 capitalize">
                                {key.replaceAll("_", " ")}
                            </th>
                        ))}
                        <th className="border px-2 py-1">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {responses.map((entry, idx) => (
                        <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-800">
                            {allFields.map((key) => (
                                <td key={key} className="border px-2 py-1">
                                    {entry[key]}
                                </td>
                            ))}
                            <td className="border px-2 py-1 text-center space-x-2">
                                <button
                                    onClick={() => handleEdit(entry)}
                                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                                >
                                    <FaEdit />
                                    <span className="hidden md:inline">Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(entry.id)}
                                    className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                                >
                                    <FaTrashAlt />
                                    <span className="hidden md:inline">Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyForm;