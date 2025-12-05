import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    try {
      const [first, ...rest] = name.trim().split(" ");
      const last = rest.join(" ") || "";

      await api.post("/api/v1/auth/register", {
        email,
        password,
        account_association: "Individual",
        first_name: first,
        last_name: last,
        phone_number: phone,
        company_name: company,
      });

      toast.success("Account created! OTP sent to your email.");

      navigate(`/auth/verify-otp?email=${email}&type=signup`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-lexend">

      {/* Full Name */}
      <div className="space-y-1">
        <Label>Full Name</Label>
        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Company */}
      <div className="space-y-1">
        <Label>Company Name</Label>
        <Input
          placeholder="Company Pvt Ltd"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <Label>Phone Number</Label>
        <Input
          type="number"
          placeholder="99999 99999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {!phoneValid && phone.length > 0 && (
          <p className="text-red-500 text-xs">Phone must be at least 10 digits</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!emailValid && email.length > 0 && (
          <p className="text-red-500 text-xs">Enter a valid email</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1 relative">
        <Label>Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="absolute right-3 top-8 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-1 relative">
        <Label>Confirm Password</Label>
        <Input
          type={showConfirm ? "text" : "password"}
          placeholder="******"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <div
          className="absolute right-3 top-8 cursor-pointer"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>

        {confirm.length > 0 && !passwordsMatch && (
          <p className="text-red-500 text-xs">Passwords do not match</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!formValid}
        className={`w-full py-2 rounded-lg text-white bg-[#A855F7] transition 
        ${!formValid && "opacity-50 cursor-not-allowed"}`}
      >
        Create Account
      </button>
    </form>
  );
}
