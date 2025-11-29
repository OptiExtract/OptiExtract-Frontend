import React from "react";
import { useLocation } from "react-router-dom";
import BoundingBoxViewer from "@/components/BoundingBoxViewer";

export default function ReviewDashboard() {
  const location = useLocation();
  const data = location.state;

  const imageUrl =
    data?.ocr?.image_url || data?.annotated_file_path || "/placeholder-doc.png";

  const boxes =
    data?.ocr?.boxes?.map((b, i) => ({
      id: i,
      text: b.text,
      confidence: b.confidence,
      box: b.box, // [x_min, y_min, x_max, y_max]
    })) || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-3">Review Extracted Data</h1>

      <p className="text-gray-700 text-sm mb-4">
        Fill rate: <b>{(data?.fill_rate * 100).toFixed(1)}%</b> |
        Confidence: <b>{(data?.confidence_score * 100).toFixed(1)}%</b>
      </p>

      <BoundingBoxViewer imageUrl={imageUrl} boxes={boxes} />
    </div>
  );
}
