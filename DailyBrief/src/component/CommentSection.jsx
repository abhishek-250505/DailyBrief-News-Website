import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import api from "../config/axios";

const CommentSection = ({ newsId }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("auth_token")?.trim();

  const fetchComments = useCallback(async () => {
    if (!newsId) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.get(`/comment/${encodeURIComponent(newsId)}`);
      setComments(response.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.msg || "Unable to load comments. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, [newsId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePostComment = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (!token || token === "undefined" || token === "null") {
      setError("Please login to post a comment.");
      return;
    }

    setPosting(true);
    setError("");

    try {
      await api.post(
        "/comment",
        {
          newsId,
          text: newComment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      await fetchComments();
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to post comment.");
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setError("");
    try {
      await api.delete(`/comment/${commentId}`);
      await fetchComments();
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to delete comment.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded-3xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Comments</h2>
          <p className="text-sm text-gray-500">
            {comments.length} comment{comments.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl bg-gray-100 h-24" />
            ))}
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="rounded-3xl border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{comment.userName}</p>
                  <p className="text-xs text-gray-500">{comment.userEmail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                  {(user && (String(user.id) === String(comment.userId) || user.email === comment.userEmail)) && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3 text-gray-700">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts.</p>
        )}
      </div>

      <div className="mt-8">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Add a comment
        </label>
        <textarea
          id="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-3xl border border-gray-300 p-4 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Write your comment here..."
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            {token
              ? "You can post a comment now."
              : "Login to post a comment. Your token will be sent automatically."}
          </div>
          <button
            onClick={handlePostComment}
            disabled={!token || posting}
            className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
    </section>
  );
};

export default CommentSection;
