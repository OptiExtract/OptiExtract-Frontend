import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const COUNTRY_CODES = {
  IN: "+91",
  US: "+1",
  GB: "+44",
  AU: "+61",
  JP: "+81",
  AE: "+971",
  DE: "+49",
  FR: "+33",
  SG: "+65",
  CA: "+1",
};

export default function SignupForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto detect country code
  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const country = data.country;

        if (COUNTRY_CODES[country]) {
          setCountryCode(COUNTRY_CODES[country]);
        }
      } catch (err) {
        console.log("Location detection failed:", err);
      }
    }
    detectCountry();
  }, []);

  // Validations
  const passwordsMatch = password && confirm && password === confirm;
  const emailValid = email.includes("@") && email.includes(".");
  const phoneValid = phone.length >= 10;

  const formValid =
    name.trim().length > 2 &&
    company.trim().length > 2 &&
    emailValid &&
    phoneValid &&
    password.length >= 6 &&
    passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formValid) {
      setError("Please fix the highlighted fields.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      company_name: company,
      phone_number: `${countryCode}${phone}`,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Signup success:", res.data);
      alert("Account created successfully!");

    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
          placeholder="Your Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <Label>Phone Number</Label>
        <div className="flex items-center space-x-2">

          {/* Country Code Dropdown */}
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-[#A855F7]"
          >
            {Object.entries(COUNTRY_CODES).map(([country, code]) => (
              <option key={country} value={code}>
                {country} {code}
              </option>
            ))}
          </select>

          {/* Phone input */}
          <Input
            type="tel"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="flex-1 focus:ring-[#A855F7]"
          />
        </div>

        {!phoneValid && phone.length > 0 && (
          <p className="text-red-600 text-xs mt-1">Enter a valid phone number</p>
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
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600"
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
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

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

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formValid || loading}
        className="w-full py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] disabled:opacity-60 transition-all"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
