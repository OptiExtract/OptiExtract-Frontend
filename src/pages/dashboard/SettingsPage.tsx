import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

// Strong typing for user profile received from backend
interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  company_name: string;
  account_type?: string;
  account_association?: string;
  created_at?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

const SettingsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // UI-only toggles
  const [notifications, setNotifications] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const loadUser = async () => {
      try {
        const res = await api.get<UserProfile>(`/api/v1/users/${user.id}`);
        setProfile(res.data);
      } catch {
        toast.error("Failed to load settings");
      }
    };

    loadUser();
  }, [user]);

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);

    try {
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        company_name: profile.company_name,
      };

      await api.put(`/api/v1/users/${profile.id}`, payload);

      toast.success("Settings updated");
    } catch (err: unknown) {
      const message =
        (err as any)?.response?.data?.message || "Failed to update settings";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <p className="p-6">Loading settings...</p>;
  }

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
            onCheckedChange={(val: boolean) => setNotifications(val)}
          />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-gray-500">Toggle UI appearance</p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={(val: boolean) => setDarkMode(val)}
          />
        </div>

        {/* Account Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Account Settings</h3>

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
};

export default SettingsPage;
