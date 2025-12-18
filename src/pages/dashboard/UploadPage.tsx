import React, { useState, useRef } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const allowedTypes = ["application/pdf", "image/png", "image/jpg", "image/jpeg"];
  const maxSizeMB = 10;

  const validateFile = (uploaded: File | undefined) => {
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    validateFile(e.target.files?.[0]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    validateFile(e.dataTransfer.files?.[0]);
  };

  const extractDocument = async () => {
    if (!file) return toast.error("Upload a file first.");

    try {
      setLoading(true);

      
      // ---------------------------
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await api.post("/api/v1/extract", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const filePath =
        uploadRes.data?.original_file_path ||
        uploadRes.data?.file_path;

      if (!filePath) {
        toast.error("Backend did not return file_path.");
        return;
      }

      
      const ocrRes = await api.get(`/api/v1/ocr/extract?file_path=${filePath}`);

     
      const validationRes = await api.post(
        `/api/v1/validation/process?original_file_path=${filePath}`,
        ocrRes.data // extracted fields
      );

      // Move data to review page
      navigate("/dashboard/review", { state: validationRes.data });

      toast.success("Document extracted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Extraction failed.");
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
        onClick={() => inputRef.current?.click()}
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
          ref={inputRef}
          type="file"
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
