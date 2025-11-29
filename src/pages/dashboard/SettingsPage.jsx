import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  // Local UI-only states (not saved to backend)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadUser = async () => {
      try {
        const res = await api.get(`/api/v1/users/${user.id}`);
        setProfile(res.data);
      } catch (err) {
        toast.error("Failed to load settings");
      }
    };

    loadUser();
  }, [user]);

  const saveSettings = async (e) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);

    try {
      // ONLY send updatable fields (backend requirement)
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        company_name: profile.company_name,
      };

      await api.put(`/api/v1/users/${user.id}`, payload);

      toast.success("Settings updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <p className="p-6">Loading settings...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <form onSubmit={saveSettings} className="space-y-8">

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Notifications</h4>
            <p className="text-sm text-gray-500">
              Receive email & dashboard alerts
            </p>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-gray-500">Toggle UI appearance</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        {/* Account */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Account Settings</h3>

          {/* Email - read only */}
          <div>
            <label>Email</label>
            <Input value={profile.email} disabled className="bg-gray-100" />
          </div>

          <div>
            <label>First Name</label>
            <Input
              value={profile.first_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, first_name: e.target.value })
              }
            />
          </div>

          <div>
            <label>Last Name</label>
            <Input
              value={profile.last_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, last_name: e.target.value })
              }
            />
          </div>

          <div>
            <label>Phone Number</label>
            <Input
              value={profile.phone_number || ""}
              onChange={(e) =>
                setProfile({ ...profile, phone_number: e.target.value })
              }
            />
          </div>

          <div>
            <label>Company Name</label>
            <Input
              value={profile.company_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, company_name: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
