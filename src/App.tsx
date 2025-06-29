import "@/styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { AuthProvider } from "./contexts/auth/auth-provider";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}
