import React from "react";
import { useLocation } from "react-router-dom";
import BoundingBoxViewer from "@/components/BoundingBoxViewer";

export default function ReviewPage() {
  const location = useLocation();
  const { extracted, ocr } = location.state || {};

  const imageUrl =
    ocr?.image_url ||
    extracted?.annotated_file_path ||
    "/placeholder-doc.png";

  const boxes =
    ocr?.boxes?.map((b, index) => ({
      id: index,
      text: b.text,
      confidence: b.confidence,
      box: b.box,
    })) || ocr || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Review Document</h1>

      <div className="mb-4 text-sm text-gray-600">
        <p>
          Fill rate:{" "}
          <b>{((extracted?.fill_rate || 0) * 100).toFixed(1)}%</b>
        </p>
        <p>
          Confidence:{" "}
          <b>{((extracted?.confidence_score || 0) * 100).toFixed(1)}%</b>
        </p>
      </div>

      <BoundingBoxViewer imageUrl={imageUrl} boxes={boxes} />
    </div>
  );
}
