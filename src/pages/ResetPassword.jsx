import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [form, setForm] = useState({
    new_password: "",
    confirm_password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      return toast.error("Passwords do not match");
    }

    try {
      await api.post("/api/v1/auth/password/reset", {
        token,
        new_password: form.new_password,
      });

      toast.success("Password changed successfully!");

      window.location.href = "/auth/login";
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={form.new_password}
            onChange={(e) =>
              setForm({ ...form, new_password: e.target.value })
            }
            required
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA]"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
