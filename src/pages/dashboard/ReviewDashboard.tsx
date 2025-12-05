import React from "react";
import BoundingBoxViewer from "@/components/BoundingBoxViewer";

const ReviewDashboard: React.FC = () => {
  const data = JSON.parse(localStorage.getItem("review_data") || "null");

  if (!data) return <p>No review data available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-3">Review Document</h1>

      <p className="text-gray-700 text-sm mb-4">
        Fill rate: <b>{(data.fill_rate * 100).toFixed(1)}%</b> |
        Confidence: <b>{(data.confidence_score * 100).toFixed(1)}%</b>
      </p>

      <BoundingBoxViewer
        imageUrl={data.annotated_file_path}
        boxes={data.ocr_result?.boxes || []}
      />
    </div>
  );
};

export default ReviewDashboard;
