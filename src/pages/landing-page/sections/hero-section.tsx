import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  return (
    <section className="mt-16 mb-32 flex items-center justify-between gap-8">
      <div className="max-w-[34rem] flex flex-col gap-10">
        <h1 className="text-[3.5rem]/[110%] text-blue-1000">
          Conectamos suas{" "}
          <strong>necessidades aos especialistas certos.</strong>
        </h1>

        <div className="text-body-md flex flex-col gap-6">
          <p>
            Receba orientações e encontre especialistas verificados para te
            ajudar no que for preciso, com segurança.
          </p>
          <p>
            Não sabe por onde começar?{" "}
            <strong>
              Faça até 3 perguntas gratuitamente para nossa IA especializada!
            </strong>
          </p>

          <div className="relative w-full">
            <Input
              placeholder="Digite aqui a sua dúvida..."
              className={cn(
                "h-[3.5rem] w-full pl-4 pr-36 py-2 border rounded-lg text-gray-800 text-body-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              )}
            />

            <Button className="absolute right-6 top-[50%] -translate-y-[50%] text-white rounded-r-lg hover:bg-blue-600 transition-colors">
              Perguntar
            </Button>
          </div>
        </div>
      </div>

      <img src="/hero.png" alt="Banner da sessão" />
    </section>
  );
};
