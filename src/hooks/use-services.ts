import {
  ServicesContext,
  type ServicesContextData,
} from "@/contexts/services/services-context";
import { useContext } from "react";

export const useServices = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error("useServices must be used within an ServicesProvider");
  }

  return context as ServicesContextData;
};
