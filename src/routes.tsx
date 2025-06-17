import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        children: [
          {
            path: "professional",
            element: <div>Professional Sign Up</div>,
          },
          {
            path: "enterprise",
            element: <div>Enterprise Sign Up</div>,
          }
        ]
      }
    ],
  },
]);
