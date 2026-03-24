import { useEffect, useState } from "react";

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", link: "" });

    const fetchArticles = async () => {
        try {
            const res = await fetch("http://localhost:5000/articles");
            const data = await res.json();
            setArticles(data);
        } catch (err) {
            console.error("Error fetching articles", err);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setForm({ title: "", description: "", link: "" });
                fetchArticles();
            }
        } catch (err) {
            console.error("Submit failed", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                📖 Articles
            </h1>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Submit New Article</h2>
                <input
                    name="title"
                    placeholder="Article Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
                    required
                />
                <textarea
                    name="description"
                    placeholder="2-paragraph summary"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
                    required
                />
                <input
                    name="link"
                    placeholder="Link to article"
                    value={form.link}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit
                </button>
            </form>

            <div>
                <h2 className="text-2xl font-bold mb-4">Available Articles</h2>
                {articles.map((article) => (
                    <div key={article.id} className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-700">
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        <p className="mb-2">{article.description}</p>
                        <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Read More
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}