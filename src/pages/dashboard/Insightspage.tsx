import React, { useEffect, useState } from "react";
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
import api from "@/lib/api";
import { toast } from "sonner";



interface MonthlyTrend {
  month: string;
  count: number;
}

interface DocumentType {
  name: string;
  value: number;
}

interface InsightsResponse {
  total_documents: number;
  completed: number;
  failed: number;
  success_rate: number;
  monthly_trend: MonthlyTrend[];
  document_types: DocumentType[];
}


const COLORS = ["#A855F7", "#6366F1", "#EC4899", "#10B981"];

const InsightsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<InsightsResponse | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await api.get<InsightsResponse>(
          "/api/v1/insights/overview"
        );
        setData(res.data);
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || "Failed to load insights"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading insights...</p>;
  }

  if (!data) {
    return <p className="text-gray-500">No insights available</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Insights Overview
      </h1>
      <p className="text-sm text-gray-500">
        Visual summary of your document extraction activity.
      </p>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InsightCard title="Total Documents" value={data.total_documents} />
        <InsightCard
          title="Completed"
          value={data.completed}
          accent="success"
        />
        <InsightCard
          title="Failed"
          value={data.failed}
          accent="danger"
        />
        <InsightCard
          title="Success Rate"
          value={`${data.success_rate}%`}
        />
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LINE CHART */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            Monthly Extraction Trend
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.monthly_trend}>
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-2">
            Document Type Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data.document_types}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.document_types.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
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

interface InsightCardProps {
  title: string;
  value: string | number;
  accent?: "success" | "danger";
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  accent,
}) => {
  const color =
    accent === "success"
      ? "text-green-600"
      : accent === "danger"
      ? "text-red-600"
      : "text-[#A855F7]";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-semibold mt-1 ${color}`}>
        {value}
      </h2>
    </div>
  );
};
