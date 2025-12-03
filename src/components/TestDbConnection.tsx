import { useEffect, useState } from "react";
import createApiCall, { GET } from "../components/api/api";

// 1. Define the API call outside the component (best practice)
// This verifies that your 'createApiCall' factory is working
const fetchDbData = createApiCall("/db", GET);

const TestDbConnection = () => {
  // Use unknown instead of any for data where structure isn't guaranteed
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 2. Execute the API call
      console.log("Testing connection to /db...");
      const result = await fetchDbData();

      console.log("Success:", result);
      setData(result);
    } catch (err: unknown) {
      // Use unknown for catch block
      console.error("Connection failed:", err);

      let errorMessage = "Unknown error occurred";

      // Safely narrow the type to extract error message
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null) {
        // Assert as Record to check properties safely
        const errorObj = err as Record<string, unknown>;
        if (typeof errorObj.message === "string") {
          errorMessage = errorObj.message;
        } else if (typeof errorObj.error === "string") {
          errorMessage = errorObj.error;
        }
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Run on mount
  useEffect(() => {
    handleTest();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4 font-sans">
      <h2 className="text-xl font-bold">API Connectivity Test</h2>

      <div className="p-4 border rounded bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Endpoint:</strong> {import.meta.env.VITE_API_BASE_URL}/db
        </p>

        <button
          onClick={handleTest}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Retry Connection"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
          <h3 className="font-semibold">Error:</h3>
          <pre className="text-xs mt-2 whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {/* Fix: Check strict inequality to null to avoid 'unknown' type error in JSX */}
      {data !== null && (
        <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800">
          <h3 className="font-semibold">Success! Response Data:</h3>
          <pre className="text-xs mt-2 overflow-auto max-h-96 p-2 bg-white border rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestDbConnection;
