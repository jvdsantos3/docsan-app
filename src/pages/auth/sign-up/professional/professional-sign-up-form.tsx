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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { type Step } from "@/hooks/useMultiStepForm";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CornerUpLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const DEFAULT_VALUES = {
  fullName: "",
  cpf: "",
  birthDate: "",
  email: "",
  password: "",
  phone: "",
  fieldOfActivity: "",
  proRegistration: "",
  proRegistrationState: "",
  cnae: "",
  address: {
    zipCode: "",
    state: "",
    city: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
  },
  terms: false,
};

const professionalSignUpFormSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  cpf: z.string().min(1, "CPF é obrigatório"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  fieldOfActivity: z.string().min(1, "Ramo de atuação é obrigatório"),
  proRegistration: z.string().min(1, "Registro profissional é obrigatório"),
  proRegistrationState: z.string().min(1, "UF do registro é obrigatório"),
  cnae: z.string().min(1, "CNAE é obrigatório"),
  address: z.object({
    zipCode: z.string().min(1, "CEP é obrigatório"),
    state: z.string().min(1, "UF é obrigatória"),
    city: z.string().min(1, "Cidade é obrigatória"),
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
  }),
  terms: z.boolean().refine((val) => val, {
    message: "Você deve aceitar os termos de uso",
  }),
});

const stepFields: Record<string, string[]> = {
  "personal-data": [
    "fullName",
    "cpf",
    "birthDate",
    "email",
    "password",
    "phone",
  ],
  "professional-data": [
    "fieldOfActivity",
    "proRegistration",
    "proRegistrationState",
    "cnae",
  ],
  "address-data": [
    "address.zipCode",
    "address.state",
    "address.city",
    "address.street",
    "address.number",
    "address.neighborhood",
    "address.complement",
    "terms",
  ],
};

type ProfessionalSignUpFormSchema = z.infer<
  typeof professionalSignUpFormSchema
>;

type ProfessionalSignUpFormProps = {
  steps: Step[];
  step: Step;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
};

export const ProfessionalSignUpForm = ({
  steps,
  step,
  isFirstStep,
  isLastStep,
  nextStep,
  previousStep,
}: ProfessionalSignUpFormProps) => {
  const form = useForm<ProfessionalSignUpFormSchema>({
    resolver: zodResolver(professionalSignUpFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function handleNextStep() {
    const fieldsToValidate = stepFields[step.id];
    const isValid = await form.trigger(
      fieldsToValidate as Array<keyof ProfessionalSignUpFormSchema>
    );
    if (isValid) {
      nextStep();
    }
  }

  function onSubmit(data: ProfessionalSignUpFormSchema) {
    // if (!isLastStep) nextStep();
    console.log("Form data submitted:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <Button
            type="button"
            variant="ghost"
            className={cn("text-blue-source vis", isFirstStep && "invisible")}
            onClick={previousStep}
          >
            <CornerUpLeft /> Voltar
          </Button>

          <Tabs defaultValue={"personal-data"} value={step.id}>
            {steps.map((step) => (
              <TabsContent value={step.id} key={step.id}>
                {step.id === "personal-data" && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            Nome completo
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
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            CPF
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
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            Data de nascimento
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            E-mail
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            Senha
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            Telefone
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step.id === "professional-data" && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fieldOfActivity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            Ramo de atuação
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
                      name="proRegistration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            Registro profissional
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
                      name="proRegistrationState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            UF do registro
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
                      name="cnae"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-lato text-gray-300">
                            CNAE
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step.id === "address-data" && (
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name="address.zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-lato text-gray-300">
                              Cep
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
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-lato text-gray-300">
                              UF
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address.city"
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
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name="address.street"
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
                        name="address.number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-lato text-gray-300">
                              Número
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address.neighborhood"
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
                      name="address.complement"
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
                      render={() => (
                        <FormItem className="flex flex-row items-center gap-2">
                          <FormControl>
                            <Checkbox />
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex gap-3 justify-between items-end">
            <p className="font-lato text-sm text-gray-600 text-center">
              Já possui uma conta?{" "}
              <Link to={"/sign-in"} className="text-blue-source font-bold">
                Faça login!
              </Link>
            </p>
            <Button
              type={isLastStep ? "submit" : "button"}
              className="font-bold text-base rounded-xl"
              size="lg"
              onClick={isLastStep ? undefined : handleNextStep}
            >
              {isLastStep ? "Cadastrar" : "Continuar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
