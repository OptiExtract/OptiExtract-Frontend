import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Upload, ShieldCheck, Clock, Lock, Link as LinkIcon } from "lucide-react";

export default function SettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold">Settings</h1>

      {/* PROFILE SETTINGS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>

        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            {avatar ? (
              <img src={avatar} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No Image
              </div>
            )}
          </div>

          <label className="cursor-pointer px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition flex items-center space-x-2">
            <Upload size={18} />
            <span>Upload Avatar</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
        </div>
      </div>

      {/* SECURITY SETTINGS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <ShieldCheck className="text-purple-600" size={20} />
          <span>Security Settings</span>
        </h2>

        {/* 2FA */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-gray-500">Add extra security to your account.</p>
          </div>

          <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>

        <button className="px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition">
          Change Password
        </button>
      </div>

      {/* INTEGRATIONS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <LinkIcon className="text-purple-600" size={20} />
          <span>Connected Integrations</span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Google Drive</h3>
              <p className="text-sm text-gray-500">Sync documents automatically.</p>
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Connect</button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dropbox</h3>
              <p className="text-sm text-gray-500">Import files directly.</p>
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Connect</button>
          </div>
        </div>
      </div>

      {/* ROLE & PERMISSIONS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Lock className="text-purple-600" size={20} />
          <span>User Role & Permissions</span>
        </h2>

        <p className="text-gray-800"><strong>Role:</strong> Standard User</p>
        <p className="text-sm text-gray-500">You can upload documents and run extractions.</p>
      </div>

      {/* ACTIVITY LOGS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Clock className="text-purple-600" size={20} />
          <span>Activity Logs</span>
        </h2>

        <ul className="space-y-2 text-sm text-gray-600">
          <li>📄 Uploaded <strong>Invoice_2024.pdf</strong></li>
          <li>🔐 Enabled 2FA</li>
          <li>📤 Extracted key values from <strong>Report_Jan.pdf</strong></li>
          <li>👤 Updated profile</li>
        </ul>
      </div>
    </div>
  );
}
