const DocumentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Documents</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>No listing endpoint available from backend.</p>
        <p className="text-gray-500 text-sm mt-1">
          Add <code>/api/v1/uploads</code> route to show history.
        </p>
      </div>
    </div>
  );
};

export default DocumentsPage;
