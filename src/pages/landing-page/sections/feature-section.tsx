import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/data/mockups/services";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const FeatureSection = () => {
  return (
    <section className="mb-18 flex flex-col gap-20">
      <div className="max-w-[39rem] flex flex-col gap-6 self-center text-center">
        <h2 className="text-heading-lg/[120%] text-blue-1000">
          Soluções completas em <strong>consultoria regulatória.</strong>
        </h2>

        <p className="text-heading-sm text-blue-950">
          Conectamos sua empresa aos melhores especialistas para garantir
          conformidade, eficiência e crescimento no setor regulado.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <Card key={service.id}>
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-56 object-cover rounded-t-md"
              />
              <CardHeader>
                <CardTitle className="line-clamp-1">{service.title}</CardTitle>
                <CardDescription className="line-clamp-3 h-16">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
                  <Button variant="outline" className="font-bold text-blue-source" asChild>
                    <Link to={`services/${service.id}`}>Ver detalhes</Link>
                  </Button>
                  <Button className="font-bold">Quero contratar</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Button className={cn("self-center")} asChild>
          <Link to="/services">Ver todos os serviços</Link>
        </Button>
      </div>
    </section>
  );
};
