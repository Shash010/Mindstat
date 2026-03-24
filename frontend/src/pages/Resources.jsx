// src/pages/ResourcesPage.jsx
import { useEffect, useState } from "react";
import ResourceForm from "../components/ResourceForm";
import ResourceTable from "../components/ResourceTable";

export default function ResourcesPage() {
    const [resources, setResources] = useState([]);

    const fetchResources = async () => {
        try {
            const res = await fetch("http://localhost:5000/resources", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setResources(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching resources", err);
            setResources([]);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center dark:text-white">🧭 Mental Health Resources</h1>
            <ResourceForm onResourceAdded={fetchResources} />
            <ResourceTable resources={resources} />
        </div>
    );
}