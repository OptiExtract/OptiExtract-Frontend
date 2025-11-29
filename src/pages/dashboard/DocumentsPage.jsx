import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { FileText, Search, Filter } from "lucide-react";

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      const res = await api.get("/api/v1/uploads");
      setDocs(res.data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Documents</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>

        {loading ? (
          <p>Loading...</p>
        ) : docs.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Document</th>
                <th className="py-3">Uploaded</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {docs.map((d) => (
                <tr key={d.id} className="border-b">
                  <td className="py-3 flex items-center gap-2">
                    <FileText className="text-purple-500" size={18} />
                    {d.file_name}
                  </td>
                  <td>{new Date(d.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                      {d.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
