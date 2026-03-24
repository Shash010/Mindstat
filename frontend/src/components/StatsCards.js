export default function StatsCards() {
    const stats = [
        { title: "Countries with Policies", value: "72%", description: "Updated 2023" },
        { title: "Avg. Psychiatrists / 100K", value: "1.2", description: "Global Average" },
        { title: "Total Resources Tracked", value: "150+", description: "Hospitals, Helplines" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">{stat.title}</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{stat.description}</p>
                </div>
            ))}
        </div>
    );
}