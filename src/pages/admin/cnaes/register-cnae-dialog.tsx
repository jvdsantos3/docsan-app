import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type RegisterCnaeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const schema = z.object({
  code: z.string().min(1).max(10),
  description: z.string().min(1, 'Adicione uma descrição.').max(100),
})

type CnaeFormSchema = z.infer<typeof schema>

export const RegisterCnaeDialog = ({
  open,
  onOpenChange,
}: RegisterCnaeDialogProps) => {
  const form = useForm<CnaeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      description: '',
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar novo CNAE</DialogTitle>
          <DialogDescription>
            Cadastre um novo Classificação Nacional de Atividades Econômicas
            (CNAE).
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNAE</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o CNAE" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Dê uma descrição" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin" />
                  )}
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
