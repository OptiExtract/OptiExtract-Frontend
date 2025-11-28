import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InsightsPage() {
  // Sample Monthly Data
  const monthlyData = [
    { month: "Jan", count: 22 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 30 },
    { month: "Apr", count: 24 },
    { month: "May", count: 35 },
    { month: "Jun", count: 28 },
  ];

  // Sample document type distribution
  const typeData = [
    { name: "Invoices", value: 55 },
    { name: "Reports", value: 25 },
    { name: "Summaries", value: 15 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#A855F7", "#6366F1", "#EC4899", "#10B981"];

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Insights Overview</h1>
        <p className="text-sm text-gray-500">
          Visual summary of your AI-powered document extraction activity.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <InsightCard title="Total Documents" value="132" />
        <InsightCard title="Completed" value="118" accent="success" />
        <InsightCard title="Failed" value="14" accent="danger" />
        <InsightCard title="Success Rate" value="89%" />

      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Line Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Monthly Extraction Trend</h2>
          <p className="text-sm text-gray-500 mb-4">
            Number of documents extracted per month
          </p>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#A855F7"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-2">Document Type Breakdown</h2>
          <p className="text-sm text-gray-500 mb-4">
            Distribution of document categories
          </p>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {typeData.map((_entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Quick Summary</h2>

        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Peak month for extraction: <strong>May</strong></li>
          <li>• Most processed document type: <strong>Invoices</strong></li>
          <li>• Overall extraction accuracy: <strong>89%</strong></li>
          <li>• Documents requiring review: <strong>14</strong></li>
        </ul>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function InsightCard({ title, value, accent }) {
  const accentStyles =
    accent === "success"
      ? "bg-green-50 text-green-600"
      : accent === "danger"
      ? "bg-red-50 text-red-600"
      : "bg-purple-50 text-[#A855F7]";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-semibold mt-1 ${accentStyles}`}>{value}</h2>
    </div>
  );
}
