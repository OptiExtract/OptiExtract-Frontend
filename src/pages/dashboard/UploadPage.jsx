import React, { useState, useRef } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const allowedTypes = ["application/pdf", "image/png", "image/jpg", "image/jpeg"];
  const maxSizeMB = 10;

  const validateFile = (uploaded) => {
    if (!uploaded) return;

    if (!allowedTypes.includes(uploaded.type)) {
      toast.error("Upload PDF, PNG, JPG, or JPEG.");
      return;
    }

    if (uploaded.size / 1024 / 1024 > maxSizeMB) {
      toast.error("Max 10MB allowed.");
      return;
    }

    setFile(uploaded);
  };

  const handleFileSelect = (e) => validateFile(e.target.files[0]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    validateFile(e.dataTransfer.files[0]);
  };

  const extractDocument = async () => {
    if (!file) return toast.error("Upload a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/api/v1/extract", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;

      toast.success("Document processed!");

      navigate("/dashboard/review", { state: data });

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Extraction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-6">Upload a Document</h1>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          dragActive ? "border-purple-600 bg-purple-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        {!file ? (
          <div className="flex flex-col items-center gap-3">
            <UploadCloud size={60} className="text-purple-600" />
            <p className="text-lg font-medium">Drag & drop your file here</p>
            <p className="text-sm text-gray-600">or click to browse</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <UploadCloud size={50} className="text-purple-600" />
            <p className="font-semibold text-lg">{file.name}</p>
            <p className="text-gray-500 text-sm">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          hidden
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
        />
      </div>

      <button
        onClick={extractDocument}
        disabled={loading}
        className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            <Loader2 size={22} className="animate-spin" />
            Processing...
          </div>
        ) : (
          "Upload & Extract"
        )}
      </button>
    </div>
  );
}
