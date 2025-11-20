import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">

      {/* Email */}
      <div>
        <Label className="text-gray-700">Email</Label>
        <Input
          type="email"
          placeholder="Email"
          className="mt-1 border-gray-300 focus:ring-[#A855F7]"
        />
      </div>

      {/* Password */}
      <div>
        <Label className="text-gray-700">Password</Label>
        <div className="relative flex items-center">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="mt-1 pr-10 border-gray-300 focus:ring-[#A855F7]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

    </div>
  );
}
