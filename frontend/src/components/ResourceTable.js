// src/components/ResourceTable.jsx
export default function ResourceTable({ resources }) {
    return (
        <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Mental Health Resources</h3>
            <table className="min-w-full border text-left">
                <thead className="bg-blue-100 dark:bg-gray-700 text-black dark:text-white">
                <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Country</th>
                    <th className="p-2 border">Contact</th>
                    <th className="p-2 border">Available</th>
                </tr>
                </thead>
                <tbody>
                {resources.map((res) => (
                    <tr key={res.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white">
                        <td className="p-2 border">{res.name}</td>
                        <td className="p-2 border">{res.type}</td>
                        <td className="p-2 border">{res.country}</td>
                        <td className="p-2 border">{res.contact}</td>
                        <td className="p-2 border">{res.available ? "✅" : "❌"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}