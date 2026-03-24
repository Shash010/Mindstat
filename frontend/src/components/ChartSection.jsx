import React from "react";

export default function ChartSection({ title, children }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
                {title}
            </h2>
            <div className="flex justify-center items-center">{children}</div>
        </div>
    );
}