import React, { useState } from "react";
import { FileText, Search, Filter } from "lucide-react";

export default function DocumentsPage() {
  // Placeholder document data (replace with API later)
  const documents = [
    { name: "Invoice_2024.pdf", type: "Invoice", date: "02 Feb, 2025", status: "Completed" },
    { name: "Report_Jan.pdf", type: "Report", date: "30 Jan, 2025", status: "In Progress" },
    { name: "Summary_2025.pdf", type: "Summary", date: "20 Jan, 2025", status: "Failed" },
    { name: "Purchase_Bill.pdf", type: "Invoice", date: "10 Feb, 2025", status: "Completed" },
  ];

  // Extract unique document types
  const docTypes = [...new Set(documents.map((d) => d.type))];

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const filteredDocs =
    selectedType === "All"
      ? documents
      : documents.filter((doc) => doc.type === selectedType);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Documents</h1>

        <button className="px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition">
          Upload New
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center space-x-4 relative">
        {/* Search */}
        <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm w-full md:w-1/2">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search documents..."
            className="outline-none w-full text-sm"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center px-4 py-2 border rounded-lg bg-white shadow-sm text-gray-600 hover:bg-gray-50 relative"
        >
          <Filter size={18} className="mr-2" />
          Filter
        </button>

        {/* Dropdown */}
        {filterOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg border z-20 p-2">
            <p
              className={`cursor-pointer px-3 py-2 text-sm rounded-md hover:bg-purple-50 ${
                selectedType === "All" ? "text-[#A855F7] font-medium" : ""
              }`}
              onClick={() => {
                setSelectedType("All");
                setFilterOpen(false);
              }}
            >
              All Documents
            </p>

            {docTypes.map((type) => (
              <p
                key={type}
                className={`cursor-pointer px-3 py-2 text-sm rounded-md hover:bg-purple-50 ${
                  selectedType === type ? "text-[#A855F7] font-medium" : ""
                }`}
                onClick={() => {
                  setSelectedType(type);
                  setFilterOpen(false);
                }}
              >
                {type}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg mb-4 font-semibold">
          {selectedType === "All" ? "Recent Documents" : `${selectedType} Documents`}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Document Name</th>
                <th className="py-3">Type</th>
                <th className="py-3">Uploaded</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-5 text-center text-gray-500">
                    No documents found
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 flex items-center space-x-2">
                      <FileText size={18} className="text-purple-500" />
                      <span>{doc.name}</span>
                    </td>
                    <td>{doc.type}</td>
                    <td>{doc.date}</td>
                    <td>
                      <StatusBadge status={doc.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* STATUS BADGE COMPONENT */
function StatusBadge({ status }) {
  const statusStyles = {
    Completed: "bg-green-100 text-green-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Failed: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-lg ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
