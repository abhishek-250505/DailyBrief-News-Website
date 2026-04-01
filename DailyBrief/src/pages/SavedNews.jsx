import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/axios";
import { useAuthContext } from "../context/AuthContext";
import { RiArrowRightLine } from "@remixicon/react";

const SavedNews = () => {
  const { user } = useAuthContext();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/bookmark");
        setBookmarks(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Unable to load saved articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  const openSavedArticle = (bookmark) => {
    const article = {
      title: bookmark.title,
      url: bookmark.url,
      urlToImage: bookmark.image,
      description: bookmark.description,
      author: bookmark.author,
      source: { name: bookmark.source },
      content: bookmark.content,
      publishedAt: bookmark.publishedAt,
    };

    navigate("/article", { state: { article } });
  };

  const handleUnsave = async (bookmarkId) => {
    try {
      await api.delete(`/bookmark/${bookmarkId}`);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== bookmarkId));
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to remove saved article.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-28 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Saved News</h1>
        <p className="text-gray-600 mb-6">Please login to view your saved articles.</p>
        <Link
          to="/login"
          className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Login to continue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Saved Articles</h1>
            <p className="text-gray-500">
              {bookmarks.length} article{bookmarks.length === 1 ? "" : "s"} saved for later.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            Back to home <RiArrowRightLine />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-gray-600">Loading saved articles...</div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">{error}</div>
        ) : bookmarks.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            No saved articles yet. Find something interesting on the home page and save it for later.
          </div>
        ) : (
          <div className="grid gap-6">
            {bookmarks.map((bookmark) => (
              <div key={bookmark._id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={bookmark.image || "https://via.placeholder.com/320x180"}
                    alt={bookmark.title}
                    className="h-40 w-full rounded-lg object-cover sm:w-64"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900">{bookmark.title}</h2>
                    <p className="mt-3 text-gray-600 line-clamp-3">{bookmark.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
                      {bookmark.author && <span>By {bookmark.author}</span>}
                      {bookmark.source && <span>Source: {bookmark.source}</span>}
                      {bookmark.publishedAt && <span>{new Date(bookmark.publishedAt).toLocaleDateString()}</span>}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => openSavedArticle(bookmark)}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Open Article <RiArrowRightLine />
                      </button>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Visit Source
                      </a>
                      <button
                        onClick={() => handleUnsave(bookmark._id)}
                        className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Unsave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedNews;
