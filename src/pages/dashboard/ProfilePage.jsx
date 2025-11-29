import React, { useEffect, useState, useContext } from "react";
import api from "@/lib/api";
import { AuthContext } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, fetchUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const res = await api.get(`/users/${user.id}`);
      setProfile(res.data);
    };

    loadProfile();
  }, [user]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="p-6 bg-white rounded-xl shadow">
        <p><b>Name:</b> {profile.first_name} {profile.last_name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Phone:</b> {profile.phone_number}</p>
        <p><b>Company:</b> {profile.company_name}</p>
        <p><b>Account Type:</b> {profile.account_type}</p>
        <p><b>Templates:</b> {profile.templates_count}</p>
        <p><b>Uploads:</b> {profile.uploads_count}</p>
      </div>
    </div>
  );
}
