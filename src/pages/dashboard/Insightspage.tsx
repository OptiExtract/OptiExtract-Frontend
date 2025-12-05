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

type MonthlyData = {
  month: string;
  count: number;
};

type TypeData = {
  name: string;
  value: number;
};

const InsightsPage: React.FC = () => {
  const monthlyData: MonthlyData[] = [
    { month: "Jan", count: 22 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 30 },
    { month: "Apr", count: 24 },
    { month: "May", count: 35 },
    { month: "Jun", count: 28 },
  ];

  const typeData: TypeData[] = [
    { name: "Invoices", value: 55 },
    { name: "Reports", value: 25 },
    { name: "Summaries", value: 15 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#A855F7", "#6366F1", "#EC4899", "#10B981"];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Insights Overview</h1>
      <p className="text-sm text-gray-500">
        Visual summary of your document extraction activity.
      </p>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InsightCard title="Total Documents" value="132" />
        <InsightCard title="Completed" value="118" accent="success" />
        <InsightCard title="Failed" value="14" accent="danger" />
        <InsightCard title="Success Rate" value="89%" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LINE CHART */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Monthly Extraction Trend</h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                dataKey="count"
                type="monotone"
                stroke="#A855F7"
                strokeWidth={3}
                dot={{ r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-2">Document Type Breakdown</h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
                isAnimationActive={false}
              >
                {typeData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;


/* ---------------------- CARD COMPONENT ---------------------- */

interface InsightCardProps {
  title: string;
  value: string | number;
  accent?: "success" | "danger";
}

const InsightCard: React.FC<InsightCardProps> = ({ title, value, accent }) => {
  const style =
    accent === "success"
      ? "bg-green-50 text-green-600"
      : accent === "danger"
      ? "bg-red-50 text-red-600"
      : "bg-purple-50 text-[#A855F7]";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-semibold mt-1 ${style}`}>{value}</h2>
    </div>
  );
};
