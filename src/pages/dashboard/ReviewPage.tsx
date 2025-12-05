import React from "react";
import { useLocation } from "react-router-dom";
import BoundingBoxViewer from "@/components/BoundingBoxViewer";

interface OCRBox {
  text: string;
  confidence: number;
  box: [number, number, number, number];
}

interface OCRResult {
  image_url?: string;
  boxes?: OCRBox[];
}

interface ReviewState {
  ocr?: OCRResult;
  annotated_file_path?: string;
  fill_rate?: number;
  confidence_score?: number;
}

const ReviewDashboard: React.FC = () => {
  const location = useLocation();
  const data = location.state as ReviewState | null;

  if (!data) {
    return <p className="p-6">No review data found.</p>;
  }

  const imageUrl =
    data.ocr?.image_url ||
    data.annotated_file_path ||
    "/placeholder-doc.png";

  const boxes =
    data.ocr?.boxes?.map((b, i) => ({
      id: i,
      text: b.text,
      confidence: b.confidence,
      box: b.box,
    })) || [];

  const fillRate = data.fill_rate ? (data.fill_rate * 100).toFixed(1) : "0.0";
  const confidence = data.confidence_score
    ? (data.confidence_score * 100).toFixed(1)
    : "0.0";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-3">Review Extracted Data</h1>

      <p className="text-gray-700 text-sm mb-4">
        Fill rate: <b>{fillRate}%</b> | Confidence: <b>{confidence}%</b>
      </p>

      <BoundingBoxViewer imageUrl={imageUrl} boxes={boxes} />
    </div>
  );
};

export default ReviewDashboard;
