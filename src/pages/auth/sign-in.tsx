import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Google } from "@ridemountainpig/svgl-react";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function signIn(data: SignInFormSchema) {
    console.log(data);
    // Here you would typically handle the sign-in logic, such as calling an API
    // For example:
    // api.post("/auth/signin", data)
    //   .then(response => {
    //     console.log("Sign-in successful:", response.data);
    //   })
    //   .catch(error => {
    //     console.error("Sign-in error:", error);
    //   });
  }

  return (
    <>
      <div className="md:w-[28.125rem] lg:w-[28.125rem] bg-white border border-blue-source rounded-2xl m-2 md:m-0 py-5 px-4 md:py-10 md:px-8 flex flex-col items-center gap-10">
        <Link to={"/"}>
          <img className="w-[8.6875rem]" src="/logo-02.svg" alt="Docsan logo" />
        </Link>

        <div className="w-full space-y-8">
          <h1 className="text-lg font-medium text-gray-950">
            Faça login na sua conta!
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
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
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link to={"#"} className="text-blue-source font-lato text-xs ">
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button className="w-full rounded-xl">Entrar</Button>
            </form>
          </Form>

          <div className="space-y-4">
            <p className="font-lato text-sm text-gray-600">Ou acesse usando</p>
            <Button
              className="w-full text-gray-700 font-bold"
              variant="outline"
            >
              <Google />
              Google
            </Button>
          </div>
        </div>

        <p className="font-lato text-sm text-gray-600 text-center">
          Ainda não possui cadastro?{" "}
          <Link
            to={"#"}
            onClick={() => setOpen(true)}
            className="text-blue-source font-bold"
          >
            Cadastre-se agora!
          </Link>
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-md md:max-w-lg lg:max-w-xl ">
          <DialogHeader>
            <img className="w-[8.6875rem] mx-auto mb-4" src="/logo-02.svg" alt="Docsan logo" />
            <DialogTitle className="font-lato font-bold text-xl text-center">
              Como você deseja usar a DocSan?
            </DialogTitle>
            <DialogDescription className="font-lato font-medium text-gray-800 text-center text-lg">
              Escolha uma das opções abaixo para continuar com o cadastro.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex gap-4">
              <div className="border border-blue-source rounded-md flex flex-col justify-center items-center gap-3 px-3 py-4">
                <img src="/banner-1.svg" alt="Banner profissional" />
                <p className="font-lato font-medium text-lg text-center">
                  Quero oferecer meus serviços de consultoria regulatória.
                </p>
                <Button
                  variant="outline"
                  className="w-full font-bold text-blue-source"
                  asChild
                >
                  <Link to={"/sign-up/professional"}>Sou profissional</Link>
                </Button>
              </div>
              <div className="border border-blue-source rounded-md flex flex-col justify-center items-center gap-3 px-3 py-4">
                <img src="/banner-2.svg" alt="Banner empresarial" />
                <p className="font-lato font-medium text-lg text-center">
                  Quero contratar serviços de consultoria para minha empresa.
                </p>
                <Button
                  variant="outline"
                  className="w-full font-bold text-blue-source"
                  asChild
                >
                  <Link to={"/sign-up/enterprise"}>Sou empresa</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
