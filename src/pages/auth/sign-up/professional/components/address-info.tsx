import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CornerUpLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { professionalSignUpFormSchema } from "../schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfessionalSignUpMultiStepForm } from "../use-professional-sign-up-multi-step-form";
import { format, useMask } from "@react-input/mask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "@/data/states";
import { useAuth } from "@/hooks/use-auth";

const addressInfoSchema = professionalSignUpFormSchema.pick({
  zipCode: true,
  uf: true,
  city: true,
  street: true,
  number: true,
  neighborhood: true,
  complement: true,
  terms: true,
});

type AddressInfoSchema = z.infer<typeof addressInfoSchema>;

const cepInputOptions = {
  mask: "#####-###",
  replacement: { "#": /\d/ },
};

export const AddressInfo = () => {
  const { registerProfessional } = useAuth();
  const {
    data: contextData,
    setData,
    previousStep,
  } = useProfessionalSignUpMultiStepForm();
  const cepInputRef = useMask(cepInputOptions);
  const form = useForm<AddressInfoSchema>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      zipCode: format(contextData?.zipCode || "", cepInputOptions),
      uf: contextData?.uf || "",
      city: contextData?.city || "",
      street: contextData?.street || "",
      number: contextData?.number || "",
      neighborhood: contextData?.neighborhood || "",
      complement: contextData?.complement || "",
      terms: false,
    },
  });

  async function onSubmit(data: AddressInfoSchema) {
    setData(data);

    await registerProfessional(contextData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <Button
            type="button"
            variant="ghost"
            className="text-blue-source"
            onClick={previousStep}
          >
            <CornerUpLeft /> Voltar
          </Button>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Cep
                    </FormLabel>
                    <FormControl>
                      <Input {...field} ref={cepInputRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      UF
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state, i) => (
                          <SelectItem key={i} value={state.acronym}>
                            {state.acronym}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Cidade
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Rua
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato text-gray-300">
                      Número
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Bairro
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lato text-gray-300">
                    Complemento <em>(opcional)</em>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormLabel className="font-lato text-gray-300">
                      Li e concordo com os{" "}
                      <Link
                        to={"/terms"}
                        className="text-blue-source font-bold"
                      >
                        Termos de Uso
                      </Link>
                    </FormLabel>
                  </FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 justify-between items-end">
            <p className="font-lato text-sm text-gray-600 text-center">
              Já possui uma conta?{" "}
              <Link to={"/sign-in"} className="text-blue-source font-bold">
                Faça login!
              </Link>
            </p>
            <Button
              type="submit"
              className="font-bold text-base rounded-xl"
              size="lg"
            >
              Continuar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
