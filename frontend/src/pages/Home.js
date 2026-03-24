import { useNavigate } from "react-router-dom";
// import mentalLight from "../assets/mental.png";
// import mentalDark from "../assets/mental-dark.png";

export default function Home() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/register");
    };

    return (
        <div className="flex flex-col min-h-screen justify-between bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Hero Section */}
                    <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-5xl font-bold mb-4 text-slate-800 dark:text-white">
                                Your journey to mental wellness starts here!
                            </h1>
                            <p className="text-xl mb-6 text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                                Contribute to understanding mental health by taking our survey and exploring insights from the collected data.
                            </p>
                            <button
                                onClick={handleLoginClick}
                                className="bg-pink-300 text-white px-6 py-2 text-lg rounded-full hover:bg-pink-400 transition"
                            >
                                Register Here
                            </button>

                            {/* About Us (in hero) */}
                            <div className="mt-10">
                                <h2 className="text-3xl font-semibold mb-3 text-pink-600 dark:text-pink-400">
                                    About Us
                                </h2>
                                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 text-justify">
                                    We are a group of passionate individuals dedicated to raising awareness around mental health and building tools that make mental health data more accessible. This platform enables users to view survey statistics, analyze patterns, and take part in research-driven surveys to contribute to positive change.
                                </p>
                            </div>
                        </div>

                        {/* Right Image */}
                        {/* Right Image */}
                        {/*<div className="flex-1 flex justify-center items-center">*/}
                        {/*    <img*/}
                        {/*        src={require("../assets/mental.png")}*/}
                        {/*        alt="Mental Health"*/}
                        {/*        className="w-full max-w-lg object-contain"*/}
                        {/*        style={{*/}
                        {/*            backgroundColor: "transparent",*/}
                        {/*            boxShadow: "none",*/}
                        {/*            borderRadius: "0"*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="flex-1 flex justify-center items-center">
                            {/* Light Mode Image */}
                            <img
                                src={require("../assets/mental.png")}
                                alt="Mental Health Light"
                                className="block dark:hidden w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
                            />

                            {/* Dark Mode Image */}
                            <img
                                src={require("../assets/mental-dark.png")}
                                alt="Mental Health Dark"
                                className="hidden dark:block w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
                            />
                        </div>

                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-pink-200 dark:bg-pink-800 text-black dark:text-white py-4 border-t border-pink-300 dark:border-pink-700 text-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-center md:text-left">
                    <span>📧 support@mentalhealth.org</span>
                    <span>📞 +1 234 567 8901</span>
                    <span>📍 123 Wellness Lane, Mindtown, USA</span>
                </div>
            </footer>
        </div>
    );
}
//We are a group of passionate individuals dedicated to raising awareness around mental health and building tools that make mental health data more accessible. This platform enables users to view survey statistics, analyze patterns, and take part in research-driven surveys to contribute to positive change.