import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { newDocumentFormSchema } from '../schema'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'
import { CreateDocumentTypeDialog } from '@/components/dialogs/create-document-type-dialog'

const fieldConfigFormSchema = newDocumentFormSchema.pick({
  documentTypeId: true,
})

type FieldConfigFormSchema = z.infer<typeof fieldConfigFormSchema>

export const FieldConfigForm = () => {
  const { setData, nextStep } = useDocumentMultiStepForm()
  const form = useForm<FieldConfigFormSchema>({
    resolver: zodResolver(fieldConfigFormSchema),
    defaultValues: {
      documentTypeId: '',
    },
  })
  const [createDocTypeDialog, setCreateDocTypeDialog] = useState(false)

  const onSubmit = (data: FieldConfigFormSchema) => {
    setData(data)
    nextStep()
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Configuração dos campos
        </h2>
        <p className="font-lato font-normal text-base text-gray-800 mt-2">
          Configure até 7 campos personalizados que serão extraídos dos seus
          documentos.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="border border-input rounded-lg p-6">
              <p className="font-lato font-medium text-lg text-blue-1000">
                Tipo de documento
              </p>
              <p className="font-lato font-normal text-base text-gray-800">
                Selecione o tipo de documento para configurar os campos de
                extração específicos.
              </p>

              <FormField
                control={form.control}
                name="documentTypeId"
                render={({ field }) => (
                  <FormItem className="flex-1 mt-4">
                    <FormLabel className="font-lato font-normal text-sm text-gray-800">
                      Tipo de documento
                    </FormLabel>
                    <div className="flex gap-4">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um tipo de documento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        className="font-bold text-blue-1000 lg:min-w-[200px]"
                        onClick={() => setCreateDocTypeDialog(true)}
                      >
                        <Plus />
                        Novo tipo
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end items-center">
              <Button type="submit">
                Próximo <ChevronRight />
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <CreateDocumentTypeDialog
        open={createDocTypeDialog}
        onOpenChange={setCreateDocTypeDialog}
      />
    </div>
  )
}
