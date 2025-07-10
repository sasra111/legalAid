import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, Gavel } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      if (user.role === "admin") navigate("/admin", { replace: true });
      else if (user.role === "lawyer")
        navigate("/lawyer-dashboard/lawyer", { replace: true });
      else navigate("/client", { replace: true });
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setUser(user, token); // Save to zustand and localStorage with session time
      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "lawyer") navigate("/lawyer-dashboard/lawyer");
      else navigate("/client");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/4 w-56 h-56 bg-blue-200/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <span className="relative flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 border-2 border-blue-300 shadow-inner mb-2 animate-bounce">
            <Scale className="absolute left-2 top-2 h-9 w-9 text-blue-700 drop-shadow-md" />
            <Gavel className="absolute right-2 bottom-2 h-7 w-7 text-yellow-500 opacity-80" />
          </span>
          <h2 className="text-3xl font-bold text-center text-blue-700 drop-shadow-sm">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center font-semibold animate-pulse">
              {error}
            </div>
          )}
          <div className="fade-in-on-scroll">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:shadow-lg"
              placeholder="you@example.com"
            />
          </div>
          <div className="fade-in-on-scroll">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none pr-10 transition-all duration-300 hover:shadow-lg"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.685 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.01M21.75 12c-.512-.924-1.21-1.965-2.09-2.978m-2.32-2.568A9.716 9.716 0 0 0 12 5.25c-1.563 0-3.06.362-4.396 1.01m0 0A10.477 10.477 0 0 0 2.25 12m5.354-5.74l9.146 9.146m-9.146 0l9.146-9.146"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM19.5 12c0 3.728-3.728 6.75-7.5 6.75S4.5 15.728 4.5 12 8.228 5.25 12 5.25s7.5 3.022 7.5 6.75Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-base font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            Sign In
          </Button>
        </form>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,2,.6,1) forwards; }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Login;
