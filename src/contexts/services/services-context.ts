import type { ServiceCreateFormSchema } from "@/pages/services/service-form";
import { createContext } from "react";

export type ServicesContextData = {
  create: (data: ServiceCreateFormSchema) => Promise<void>
};

export const ServicesContext = createContext<ServicesContextData | undefined>(
  undefined
);
