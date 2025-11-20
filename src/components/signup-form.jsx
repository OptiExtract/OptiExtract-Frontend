import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const valid =
    name.trim().length >= 2 &&
    email.includes("@") &&
    password.length >= 8 &&
    password === confirm;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!valid) {
      setError("Please fill in all fields and make sure passwords match.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 800)); // Fake API delay
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 font-lexend">

      {/* Full Name */}
      <div>
        <Label htmlFor="name" className="text-gray-800 font-medium">
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 border-gray-300 focus:ring-[#A855F7]"
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-gray-800 font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 border-gray-300 focus:ring-[#A855F7]"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          We'll use this to contact you. We will not share your email with anyone else.
        </p>
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="text-gray-800 font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 border-gray-300 focus:ring-[#A855F7]"
          required
          minLength={8}
        />
        <p className="text-xs text-gray-500 mt-1">
          Must be at least 8 characters long.
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirm" className="text-gray-800 font-medium">
          Confirm Password
        </Label>
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1 border-gray-300 focus:ring-[#A855F7]"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Please confirm your password.
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Create Account Button (Purple + Black text) */}
      <Button
        type="submit"
        disabled={!valid || submitting}
        className="w-full bg-[#A855F7] text-black hover:bg-[#9333EA] py-2 rounded-lg disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Create Account"}
      </Button>

      {/* Login Link */}
      <div className="text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[#A855F7] hover:underline">
          Login
        </Link>
      </div>

    </form>
  );
}
