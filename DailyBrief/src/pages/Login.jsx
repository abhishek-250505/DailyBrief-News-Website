import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const { login, loading, error } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-900">Login to Daily Brief</h2>

        {message && <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">{message}</div>}
        {error && <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">{error}</div>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-2 block w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-2 block w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
