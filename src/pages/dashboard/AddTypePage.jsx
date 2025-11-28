import React from "react";

export default function AddTypePage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Add Document Type</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <div>
          <label className="font-medium">Document Type Name</label>
          <input 
            className="w-full mt-1 border rounded-lg px-3 py-2"
            placeholder="e.g., Invoice, Report, Receipt"
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea 
            className="w-full mt-1 border rounded-lg px-3 py-2"
            placeholder="Short description of the document type"
            rows={3}
          ></textarea>
        </div>

        <button className="px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition">
          Save Type
        </button>
      </div>

    </div>
  );
}
