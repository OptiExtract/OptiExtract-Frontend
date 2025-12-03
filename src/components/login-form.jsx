import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ FIXED ENDPOINT
      const res = await api.post("/api/v1/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token = res.data?.access_token;
      if (!token) return toast.error("Invalid response from server");

      localStorage.setItem("token", token);
      toast.success("Login successful!");

      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end -mt-2">
        <button type="button" className="text-sm text-gray-600 hover:text-black">
          Forgot Password?
        </button>
      </div>

      <button
        className="w-full py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
