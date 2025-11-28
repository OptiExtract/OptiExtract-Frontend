import React from "react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <div>
          <label className="font-medium">Full Name</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2" placeholder="Your Name" />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2" placeholder="you@example.com" disabled />
        </div>

        <div>
          <label className="font-medium">Company</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2" placeholder="Company Name" />
        </div>

        <div>
          <label className="font-medium">Phone Number</label>
          <input className="w-full mt-1 border rounded-lg px-3 py-2" placeholder="+91 99999 99999" />
        </div>

        <button className="px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition">
          Save Changes
        </button>

      </div>

    </div>
  );
}
