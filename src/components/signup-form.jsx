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
      // Split name correctly
      const [first, ...rest] = name.trim().split(" ");
      const last = rest.join(" ") || "";

      await api.post("/api/v1/auth/register", {
        email,
        password,
        account_association: "Individual",
        first_name: first,
        last_name: last,
        phone_number: phone,
        company_name: company
      });

      toast.success("Account created! OTP sent to your email.");

      // Redirect to OTP
      navigate(`/auth/verify-otp?email=${email}&type=signup`);

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-lexend">
      {/* SAME UI AS BEFORE, unchanged */}
      ...
    </form>
  );
}
