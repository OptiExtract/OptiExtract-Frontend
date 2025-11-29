import React, { useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { user, fetchUser } = useContext(AuthContext);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        company_name: user.company_name,
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await api.put(`/users/${user.id}`, form);
      toast.success("Profile updated!");
      fetchUser();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="p-6 bg-white rounded-xl shadow space-y-4">
        <Input
          placeholder="First Name"
          value={form.first_name || ""}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        <Input
          placeholder="Last Name"
          value={form.last_name || ""}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
        <Input
          placeholder="Phone Number"
          value={form.phone_number || ""}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        />
        <Input
          placeholder="Company Name"
          value={form.company_name || ""}
          onChange={(e) =>
            setForm({ ...form, company_name: e.target.value })
          }
        />

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
