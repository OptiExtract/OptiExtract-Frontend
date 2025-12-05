import React, { useState } from "react";

const AddTypePage: React.FC = () => {
  const [typeName, setTypeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Will be connected to backend later
    console.log({
      typeName,
      description,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add Document Type</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {/* Document Type Name */}
        <div>
          <label className="font-medium">Document Type Name</label>
          <input
            className="w-full mt-1 border rounded-lg px-3 py-2"
            placeholder="e.g., Invoice, Report, Receipt"
            type="text"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            className="w-full mt-1 border rounded-lg px-3 py-2"
            placeholder="Short description of the document type"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition"
        >
          Save Type
        </button>
      </div>
    </div>
  );
};

export default AddTypePage;
