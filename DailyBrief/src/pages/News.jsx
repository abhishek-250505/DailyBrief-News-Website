import React, { useEffect, useState } from "react";
import NewsCard from "../component/NewsCard";
import { useNewsContext } from "../context/NewsContext";
import Loading from "./Loading";

const News = () => {
  const { news, setNews, fetchNews } = useNewsContext();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Fetch News
  useEffect(() => {
    (async () => {
      setLoading(true);

      if (news.length === 0) {
        const data = await fetchNews();
        setNews(data?.articles || []);
      }

      setLoading(false);
    })();
  }, []);

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="px-4 ">

      {/* NEWS CARDS */}
      <div className="flex flex-wrap justify-center gap-6 mt-20">
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(6)].map((_, i) => (
              <Loading key={i} />
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="w-full py-16 text-center text-gray-500">
            No articles found for this selection.
          </div>
        ) : (
          news
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((newsDetail, ind) => (
              <NewsCard key={ind} details={newsDetail} />
            ))
        )}
      </div>

      {/* PAGINATION */}
      {news.length > 0 && (
        <div className="mt-12">
          <div className="flex flex-wrap justify-center items-center gap-2">

            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-2 border rounded-md text-sm disabled:opacity-40 hover:bg-black hover:text-white"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              if (
                i === 0 ||
                i === totalPages - 1 ||
                (i >= page - 2 && i <= page)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 border rounded-md text-sm transition ${
                      page === i + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }
              return null;
            })}

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-2 border rounded-md text-sm disabled:opacity-40 hover:bg-black hover:text-white"
            >
              Next
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default News;