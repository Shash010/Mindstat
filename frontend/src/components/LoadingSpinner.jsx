import React from "react";

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center min-h-[150px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
        </div>
    );
}