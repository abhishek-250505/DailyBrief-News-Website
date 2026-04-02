import { useState } from "react";
import { RiArrowRightLine, RiShareForwardLine, RiBookmarkLine } from "@remixicon/react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import api from "../config/axios";
import TextToSpeech from "./TextToSpeech";
import CommentSection from "../component/CommentSection";
import toast from "react-hot-toast";

const Article = () => {
  const location = useLocation();
  const article = location.state?.article;
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  if (!article) return <h1 className="text-center mt-24 text-xl">No Article Found</h1>;

  const displayText = article.content || article.description || "";
  const result = displayText
    .trim()
    .split(" ")
    .slice(0, -2)
    .join(" ");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description || article.title,
          url: article.url,
        });
        setMessage("Article shared successfully.");
      } catch {
        setMessage("Sharing canceled.");
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(article.url);
      setMessage("Article link copied to clipboard.");
    } catch {
      setMessage("Unable to copy link. Please try manually.");
    }
  };

  const handleSave = async () => {
    if (!user) {
      setMessage("Please login to save articles.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await api.post("/bookmark", {
        title: article.title,
        url: article.url,
        image: article.urlToImage || "",
        description: article.description || "",
        author: article.author || "",
        source: article.source?.name || "",
        content: article.content || article.description || "",
        publishedAt: article.publishedAt || "",
      });
      setMessage("Article saved successfully.");
      toast.success("Article saved successfully.");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Unable to save article.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4 mt-15">{article.title}</h1>

      <img
        src={article.urlToImage || "https://via.placeholder.com/900x500"}
        alt={article.title}
        className="rounded-lg mb-3 w-full object-cover"
      />

      <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500">
        {article.author && <span>By {article.author}</span>}
        {article.source?.name && <span>Source: {article.source.name}</span>}
      </div>

      <TextToSpeech title={article.title} result={result} />

      <p className="text-gray-700 mb-6 mt-6">{result || article.description}</p>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-3xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Read Full Article <span className="pl-2"><RiArrowRightLine /></span>
        </a>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center justify-center rounded-3xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          <RiShareForwardLine className="mr-2" /> Share
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={!user || saving}
          className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <RiBookmarkLine className="mr-2" /> {saving ? "Saving..." : "Save Article"}
        </button>
      </div>

      {message && <p className="mb-6 text-sm text-blue-600">{message}</p>}

      <CommentSection newsId={article.url} />
    </div>
  );
};

export default Article;
