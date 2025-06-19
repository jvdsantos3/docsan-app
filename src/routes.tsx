import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/sign-in";
import { ProfessionalSignUp } from "./pages/auth/sign-up/professional";
import { EnterpriseSignUp } from "./pages/auth/sign-up/enterprise";

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
            element: <ProfessionalSignUp />,
          },
          {
            path: "enterprise",
            element: <EnterpriseSignUp />,
          }
        ]
      }
    ],
  },
]);
