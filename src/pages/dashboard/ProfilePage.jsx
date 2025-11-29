import React, { useEffect, useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/v1/users/${user.id}`);
        setProfile(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.put(`/api/v1/users/${user.id}`, profile);

      toast.success("Profile updated!");
      setUser(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl bg-white shadow p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        <div>
          <label className="block text-sm mb-1">First Name</label>
          <Input
            value={profile.first_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, first_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <Input
            value={profile.last_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, last_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input value={profile.email} disabled className="bg-gray-100" />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <Input
            value={profile.phone_number || ""}
            onChange={(e) =>
              setProfile({ ...profile, phone_number: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Company</label>
          <Input
            value={profile.company_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, company_name: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
