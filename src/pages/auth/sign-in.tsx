import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Google } from "@ridemountainpig/svgl-react";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const SignIn = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function signIn(data: z.infer<typeof SignInFormSchema>) {
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
    <div className="md:w-[28.125rem] lg:w-[28.125rem] bg-white border border-blue-source rounded-2xl py-10 px-8 flex flex-col items-center gap-10">
      <Link to={'/'}>
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
            className="w-full text-gray-700 font-lato font-bold"
            variant="outline"
          >
            <Google />
            Google
          </Button>
        </div>
      </div>

      <p className="font-lato text-sm text-gray-600">
        Ainda não possui cadastro?{" "}
        <Link to={"#"} className="text-blue-source font-bold">
          Cadastre-se agora!
        </Link>
      </p>
    </div>
  );
};
