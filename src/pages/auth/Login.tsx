// import createApiCall, { POST } from "@/components/api/api";
import { AuthLayout } from "@/components/auth/AuthLayout";

// You have to define the response type according to your API
// interface LoginResponse {
//   access_token: string;
//   refresh_token: string;
// }

export default function LoginPage() {
  //   First define the API calls outside the component
  //   const loginUser = createApiCall<LoginResponse>("auth/login", POST);

  //   This is the example for function call
  //   const handleLoginSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     setError("");

  //     try {
  //       const response = await loginUser({
  //         body: {
  //           email,
  //           password,
  //         },
  //         isAuthEndpoint: true,
  //       });

  //       toast.success("Successfully logged in!");

  //       const appData = JSON.parse(localStorage.getItem("appData") || "{}");

  //       appData.token = response.access_token;
  //       appData.refreshToken = response.refresh_token;

  //       localStorage.setItem("appData", JSON.stringify(appData));
  //       navigate("/dashboard");
  //     } catch (err: unknown) {
  //       console.error("Login Error:", err);
  //       if (err && typeof err === "object" && "detail" in err) {
  //         setError(
  //           (err as { detail?: string }).detail ||
  //             "Login failed. Please try again."
  //         );
  //       } else {
  //         setError("An unexpected error occurred during login.");
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <AuthLayout
      title={
        <div className="flex items-center justify-center">
          {/* Add the image here */}
        </div>
      }
      description="Intelligent document processing platform"
    >
      <h1>Add the acutal form here @sreenu</h1>
    </AuthLayout>
  );
}
