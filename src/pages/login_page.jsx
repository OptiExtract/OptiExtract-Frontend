import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // STEP 1: Login
      const res = await api.post("/api/v1/auth/login", form);
      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data?.access_token;

      if (!token) {
        return toast.error("Invalid login response from server");
      }

      localStorage.setItem("token", token);

      // STEP 2: Fetch logged-in user profile
      const me = await api.get("/api/v1/users/me");
      console.log("USER PROFILE:", me.data);

      const userId = me.data?.id;
      if (!userId) {
        return toast.error("Could not load user profile");
      }

      localStorage.setItem("user_id", userId);

      toast.success("Logged in successfully!");
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-10 border border-gray-100">
        <div className="flex justify-center mb-8">
          <img src="/optiextract-logo.png" className="h-14" alt="logo" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>

            <div className="relative mt-1">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#A855F7] text-white rounded-lg text-base font-medium hover:bg-[#9333EA] transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex justify-end mt-3">
          <Link to="/auth/forgot-password" className="text-sm text-[#A855F7] hover:underline">
            Forgot Password ?
          </Link>
        </div>

        <div className="flex items-center my-6">
          <span className="flex-1 border-t"></span>
          <span className="px-3 text-xs text-gray-500">DON'T HAVE AN ACCOUNT?</span>
          <span className="flex-1 border-t"></span>
        </div>

        <Link
          to="/auth/signup"
          className="block w-full text-center border border-[#A855F7] text-[#A855F7] rounded-lg py-3 font-medium hover:bg-purple-50 transition"
        >
          Create An Account
        </Link>
      </div>
    </div>
  );
}
