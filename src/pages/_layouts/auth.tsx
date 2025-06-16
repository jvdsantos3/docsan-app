import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-[url(/background-image.png)] bg-repeat flex justify-center items-center">
      <Outlet />
    </main>
  );
};
