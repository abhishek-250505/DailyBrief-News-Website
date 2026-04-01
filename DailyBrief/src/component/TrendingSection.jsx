import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";

const TrendingSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/news?country=us&category=general");
        setArticles(response.data?.articles?.slice(0, 5) || []);
      } catch {
        setError("Unable to load trending news.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const openArticle = (article) => {
    navigate("/article", { state: { article } });
  };

  const heroArticle = articles[0];
  const smallCards = articles.slice(1, 5);

  return (
    <section className="bg-slate-100 py-10 px-4 mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-600">Trending</p>
          <h2 className="text-4xl font-extrabold text-slate-900">Today's top stories</h2>
          <p className="max-w-2xl text-gray-600">Catch up with the most important headlines from the news feed.</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-96 rounded-4xl bg-gray-200 animate-pulse" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-48 rounded-3xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-8 text-center text-red-600">{error}</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            {heroArticle && (
              <div
                onClick={() => openArticle(heroArticle)}
                className="group cursor-pointer overflow-hidden rounded-4xl bg-white shadow-xl transition hover:-translate-y-1"
              >
                <div className="relative h-96 overflow-hidden bg-slate-200">
                  <img
                    src={heroArticle.urlToImage || "https://via.placeholder.com/900x600"}
                    alt={heroArticle.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Trending
                  </span>
                </div>
                <div className="p-8">
                  <div className="mb-4 text-sm text-gray-500">{heroArticle.source?.name || "News"}</div>
                  <h3 className="text-4xl font-bold text-slate-900 leading-tight">{heroArticle.title}</h3>
                  <p className="mt-5 text-gray-600 line-clamp-4">{heroArticle.description || heroArticle.content || "Read the full story."}</p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-500">{new Date(heroArticle.publishedAt).toLocaleDateString()}</span>
                    <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Read full story
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {smallCards.map((article, index) => (
                <div
                  key={index}
                  onClick={() => openArticle(article)}
                  className="group cursor-pointer overflow-hidden rounded-[28px] bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 overflow-hidden rounded-3xl bg-slate-200">
                    <img
                      src={article.urlToImage || "https://via.placeholder.com/600x400"}
                      alt={article.title}
                      className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-600">{article.source?.name || "News"}</p>
                    <h4 className="text-lg font-semibold text-slate-900 line-clamp-3">{article.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{article.description || "Read more..."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingSection;
