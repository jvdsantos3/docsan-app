import { Route, Routes } from "react-router-dom";
import { RootLayout } from "./pages/_layouts/root";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/sign-in";
import { ProfessionalSignUp } from "./pages/auth/sign-up/professional";
import { EnterpriseSignUp } from "./pages/auth/sign-up/enterprise";
import { Services } from "./pages/services";
import { ServiceDetails } from "./pages/services/service-details";
import { LandingPage } from "./pages/landing-page";

// export const router = createBrowserRouter([
//   {
//     element: <AuthLayout />,
//     children: [
//       {
//         path: "/sign-in",
//         element: <SignIn />,
//       },
//       {
//         path: "/sign-up",
//         children: [
//           {
//             path: "professional",
//             element: <ProfessionalSignUp />,
//           },
//           {
//             path: "enterprise",
//             element: <EnterpriseSignUp />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     element: <RootLayout />,
//     children: [
//       {
//         index: true,
//         element: <LandingPage />,
//       },
//       {
//         path: "/services",
//         children: [
//           {
//             index: true,
//             element: <Services />,
//           },
//           {
//             path: ":serviceId",
//             element: <ServiceDetails />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />

        <Route path="sign-up">
          <Route path="professional" element={<ProfessionalSignUp />} />
          <Route path="enterprise" element={<EnterpriseSignUp />} />
        </Route>
      </Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />

        <Route path="services">
          <Route index element={<Services />} />

          <Route path=":serviceId" element={<ServiceDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}
