import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch = password && confirm && password === confirm;

  const emailValid = email.includes("@") && email.includes(".");
  const phoneValid = phone.length >= 10;

  const formValid =
    name.trim().length > 2 &&
    company.trim().length > 2 &&
    phoneValid &&
    emailValid &&
    password.length >= 6 &&
    passwordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) return;

    alert("Account Created Successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-lexend">

      {/* Full Name */}
      <div>
        <Label>Full Name</Label>
        <Input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Company Name */}
      <div>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <Label>Phone Number</Label>
        <Input
          type="tel"
          placeholder="1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {!phoneValid && phone.length > 0 && (
          <p className="text-red-600 text-xs mt-1">
            Phone number must be at least 10 digits.
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!emailValid && email.length > 0 && (
          <p className="text-red-600 text-xs mt-1">
            Enter a valid email address.
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label>Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <Label>Confirm Password</Label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password match status */}
        {confirm.length > 0 && (
          <p
            className={`text-xs mt-1 ${
              passwordsMatch ? "text-green-600" : "text-red-600"
            }`}
          >
            {passwordsMatch ? "Passwords match ✓" : "Passwords do not match"}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formValid}
        className="w-full py-2 bg-[#A855F7] text-black rounded-lg hover:bg-[#9333EA] disabled:opacity-60 transition-all"
      >
        Create Account
      </button>

    </form>
  );
}
