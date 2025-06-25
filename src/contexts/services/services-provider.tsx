import type { ServiceCreateFormSchema } from "@/pages/services/service-form";
import { ServicesContext } from "./services-context";
import { Outlet } from "react-router-dom";
import { api } from "@/lib/axios";

export const ServicesProvider = () => {
  const create = async (data: ServiceCreateFormSchema) => {
    await api
      .post("/services", data)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ServicesContext.Provider
      value={{
        create,
      }}
    >
      <Outlet />
    </ServicesContext.Provider>
  );
};
