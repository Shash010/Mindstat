import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import ChartSection from "../components/ChartSection";

export default function Dashboard() {
    const [genderData, setGenderData] = useState(null);
    const [socialWeaknessData, setSocialWeaknessData] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [moodSwingsData, setMoodSwingsData] = useState(null);
    const [indoorsData, setIndoorsData] = useState(null);
    const [stressIndoorsData, setStressIndoorsData] = useState(null);
    const [stressOccupationData, setStressOccupationData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                const [genderRes, socialWeaknessRes, countryRes, moodRes, indoorsRes, stressIndoorsRes, stressOccupationRes] = await Promise.all([
                    fetch("http://localhost:5000/visualizations/gender", { headers }),
                    fetch("http://localhost:5000/visualizations/social_weakness", { headers }),
                    fetch("http://localhost:5000/visualizations/country", { headers }),
                    fetch("http://localhost:5000/visualizations/mood_swings", { headers }),
                    fetch("http://localhost:5000/visualizations/days_indoors", { headers }),
                    fetch("http://localhost:5000/visualizations/stress_by_indoors", { headers }),
                    fetch("http://localhost:5000/visualizations/stress_by_occupation", { headers }),
                ]);

                const [genderJson, socialWeaknessJson, countryJson, moodJson, indoorsJson, stressIndoorsJson, stressOccupationJson] = await Promise.all([
                    genderRes.json(),
                    socialWeaknessRes.json(),
                    countryRes.json(),
                    moodRes.json(),
                    indoorsRes.json(),
                    stressIndoorsRes.json(),
                    stressOccupationRes.json(),
                ]);

                setGenderData(genderJson);
                setSocialWeaknessData(socialWeaknessJson);
                setCountryData(countryJson);
                setMoodSwingsData(moodJson);
                setIndoorsData(indoorsJson);
                setStressIndoorsData(stressIndoorsJson);
                setStressOccupationData(stressOccupationJson);
            } catch (err) {
                console.error(err);
                alert("Error fetching charts. Please login again.");
            }
        }

        fetchData();
    }, []);

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                📈 Visualizations
            </h1>
            {/* 1. Two Compact Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartSection title="Gender Distribution">
                    {genderData && (
                        <div className="w-[300px] h-[300px] mx-auto">
                            <Pie
                                data={{
                                    labels: genderData.labels,
                                    datasets: [
                                        {
                                            label: "Gender",
                                            data: genderData.data,
                                            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    )}
                </ChartSection>

                <ChartSection title="Social Weakness Distribution">
                    {socialWeaknessData && (
                        <div className="w-[300px] h-[300px] mx-auto">
                            <Pie
                                data={{
                                    labels: socialWeaknessData.labels,
                                    datasets: [
                                        {
                                            label: "Social Weakness",
                                            data: socialWeaknessData.data,
                                            backgroundColor: ["#f7b267", "#f4845f", "#845ec2"],
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    )}
                </ChartSection>
            </div>

            {/* 2. Full-width Country Bar Chart */}
            <ChartSection title="Participants by Country">
                {countryData && (
                    <Bar
                        data={{
                            labels: countryData.labels,
                            datasets: [
                                {
                                    label: "Participants",
                                    data: countryData.data,
                                    backgroundColor: "#36A2EB",
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            scales: {
                                y: { beginAtZero: true },
                            },
                        }}
                    />
                )}
            </ChartSection>

            {/* 3. Two Horizontal Stacked Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartSection title="Stress by Days Indoors">
                    {stressIndoorsData && (
                        <Bar
                            data={{
                                labels: stressIndoorsData.labels,
                                datasets: [
                                    {
                                        label: "Yes",
                                        data: stressIndoorsData.datasets["Yes"],
                                        backgroundColor: "#f39c12",
                                    },
                                    {
                                        label: "No",
                                        data: stressIndoorsData.datasets["No"],
                                        backgroundColor: "#9b59b6",
                                    },
                                    {
                                        label: "Maybe",
                                        data: stressIndoorsData.datasets["Maybe"],
                                        backgroundColor: "#e74c3c",
                                    },
                                ],
                            }}
                            options={{
                                indexAxis: "y",
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: { display: false },
                                },
                                scales: {
                                    x: { stacked: true },
                                    y: { stacked: true },
                                },
                            }}
                        />
                    )}
                </ChartSection>

                <ChartSection title="Stress by Occupation">
                    {stressOccupationData && (
                        <Bar
                            data={{
                                labels: stressOccupationData.labels,
                                datasets: [
                                    {
                                        label: "Yes",
                                        data: stressOccupationData.datasets["Yes"],
                                        backgroundColor: "#f39c12",
                                    },
                                    {
                                        label: "No",
                                        data: stressOccupationData.datasets["No"],
                                        backgroundColor: "#9b59b6",
                                    },
                                    {
                                        label: "Maybe",
                                        data: stressOccupationData.datasets["Maybe"],
                                        backgroundColor: "#e74c3c",
                                    },
                                ],
                            }}
                            options={{
                                indexAxis: "y",
                                responsive: true,
                                plugins: {
                                    legend: { position: "top" },
                                    title: { display: false },
                                },
                                scales: {
                                    x: { stacked: true },
                                    y: { stacked: true },
                                },
                            }}
                        />
                    )}
                </ChartSection>
            </div>

            {/* 4. Two More Compact Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartSection title="Mood Swings Distribution">
                    {moodSwingsData && (
                        <div className="w-[300px] h-[300px] mx-auto">
                            <Pie
                                data={{
                                    labels: moodSwingsData.labels,
                                    datasets: [
                                        {
                                            label: "Mood Swings",
                                            data: moodSwingsData.data,
                                            backgroundColor: ["#ff9aa2", "#ffb7b2", "#ffdac1"],
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    )}
                </ChartSection>

                <ChartSection title="Days Indoors Distribution">
                    {indoorsData && (
                        <div className="w-[300px] h-[300px] mx-auto">
                            <Pie
                                data={{
                                    labels: indoorsData.labels,
                                    datasets: [
                                        {
                                            label: "Days Indoors",
                                            data: indoorsData.data,
                                            backgroundColor: ["#f6c90e", "#f37121", "#ea3546", "#662e9b", "#43bccd"],
                                        },
                                    ],
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    )}
                </ChartSection>
            </div>
        </div>
    );
}