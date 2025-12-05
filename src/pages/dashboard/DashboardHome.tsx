import React from "react";
import { FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint: string;
  accent?: "success" | "danger";
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, hint, accent }) => {
  const badgeClasses =
    accent === "success"
      ? "bg-emerald-50 text-emerald-600"
      : accent === "danger"
      ? "bg-red-50 text-red-600"
      : "bg-gray-50 text-gray-600";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-full bg-purple-50 text-[#A855F7]">{icon}</div>
        <span className={`px-2 py-1 rounded-full text-[10px] ${badgeClasses}`}>
          {hint}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back 👋</h1>
        <p className="text-sm text-gray-500">
          Here's a quick overview of your document extraction activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <StatCard
          icon={<FileText size={20} />}
          label="Total Documents"
          value="—"
          hint="All time"
        />
        <StatCard
          icon={<Clock size={20} />}
          label="In Progress"
          value="—"
          hint="Currently processing"
        />
        <StatCard
          icon={<CheckCircle2 size={20} />}
          label="Completed"
          value="—"
          hint="Successfully extracted"
          accent="success"
        />
        <StatCard
          icon={<AlertTriangle size={20} />}
          label="Failed"
          value="—"
          hint="Needs review"
          accent="danger"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">Recent activity</h2>
            <span className="text-xs text-gray-500">Live updates coming soon</span>
          </div>

          <p className="text-sm text-gray-500">
            No recent documents yet. Upload a file to see activity here.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Quick actions</h2>

          <div className="space-y-3 text-sm">
            <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-[#A855F7] hover:bg-purple-50 transition">
              Upload a new document
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-[#A855F7] hover:bg-purple-50 transition">
              View all documents
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-[#A855F7] hover:bg-purple-50 transition">
              Configure document types
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
