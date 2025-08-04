import { createBrowserRouter } from "react-router-dom";
import LoginAuthGuard from "../guards/login-auth-guard";
import URLFallBack from "../components/url-fallback";
import ErrorBoundary from "../components/error-boundary";
import loadableWithRetry from "../utils/lazy-load-utils";
import AuthGuard from "../guards/auth-guard";
import RootLayout from "../layout/base-layout";

const Login = loadableWithRetry(() => import("../page/auth/login"));

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/login",
    element: (
      <LoginAuthGuard>
        <Login />
      </LoginAuthGuard>
    ),
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        {/* <div>Hello MS</div> */}
        <RootLayout />
      </AuthGuard>
    ),
  },
]);

export default router;
