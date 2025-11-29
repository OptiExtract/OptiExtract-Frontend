import React from "react";
import { useLocation } from "react-router-dom";
import BoundingBoxViewer from "@/components/BoundingBoxViewer";

export default function ReviewDashboard() {
  const location = useLocation();
  const data = location.state;

  if (!data) return <p>No review data found.</p>;

  const imageUrl =
    data?.ocr_result?.image_url ||
    data?.annotated_file_path ||
    "/placeholder-doc.png";

  const boxes =
    data?.ocr_result?.boxes?.map((b, index) => ({
      id: index,
      text: b.text,
      confidence: b.confidence,
      box: b.box,
    })) || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Review Document</h1>

      <BoundingBoxViewer imageUrl={imageUrl} boxes={boxes} />
    </div>
  );
}
