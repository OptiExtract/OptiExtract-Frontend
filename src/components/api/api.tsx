import { toast } from "sonner";

export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const DELETE = "delete";

export type HttpMethod = typeof GET | typeof POST | typeof PUT | typeof DELETE;

interface ApiCallParams {
  body?: FormData | Record<string, unknown>;
  urlParams?: Record<string, string>;
  pathVariables?: Record<string, string | number>;
  headers?: Record<string, string>;
  isAuthEndpoint?: boolean;
}

// 1. Get the URL from the standard Vite environment variable
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is not defined in your .env file");
}

const createApiCall = <T = unknown,>(url: string, method: HttpMethod) => {
  return async (params: ApiCallParams = {}): Promise<T> => {
    // Prevent double slashes if the base URL already has a trailing slash
    const hasTrailingSlash = apiBaseUrl.endsWith("/");
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;

    // If base has slash, just append. If not, add a slash.
    let apiEndpoint = hasTrailingSlash
      ? `${apiBaseUrl}${cleanUrl}`
      : `${apiBaseUrl}/${cleanUrl}`;

    const {
      body,
      urlParams,
      pathVariables,
      headers = {},
      isAuthEndpoint = false,
    } = params;

    // Handle Path Variables
    if (pathVariables) {
      apiEndpoint = Object.entries(pathVariables).reduce(
        (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
        apiEndpoint
      );
    }

    // Handle Query Params
    if (urlParams) {
      const searchParams = new URLSearchParams(urlParams);
      apiEndpoint += `?${searchParams.toString()}`;
    }

    const isFormData = body instanceof FormData;

    // Get Token
    const token =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("appData") || "{}")?.token
        : undefined;

    const requestHeaders: Record<string, string> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && !isAuthEndpoint ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: requestHeaders,
        body:
          method !== GET
            ? isFormData
              ? body
              : JSON.stringify(body)
            : undefined,
      });

      // --- SAFER PARSING LOGIC ---
      let data: unknown = null;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        // Only try to parse JSON if the server says it's JSON
        data = await response.json();
      } else {
        // Otherwise return text or empty object
        const text = await response.text();
        data = text ? { message: text } : {};
      }

      // Handle 401 Unauthorized
      if (response.status === 401) {
        if (!isAuthEndpoint) {
          toast.error("Session expired. Please sign in again.");
        }
        // Return T or reject with unknown error shape
        return Promise.reject(data || { error: "Unauthorized" });
      }

      // Handle other HTTP errors
      if (!response.ok) {
        return Promise.reject(
          data || { error: `HTTP Error ${response.status}` }
        );
      }

      return data as T;
    } catch (error) {
      // Only show toast for network errors
      if (error instanceof TypeError) {
        toast.error("Network error. Please check your connection.");
      }
      return Promise.reject(error);
    }
  };
};

export default createApiCall;
