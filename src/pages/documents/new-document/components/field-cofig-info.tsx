import { useForm } from 'react-hook-form'
import { DocumentTypeForm } from '@/components/forms/document-type-form'
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
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const FieldConfigInfo = () => {
  const form = useForm()
  const [newDocumentTypeDialogOpen, setNewDocumentTypeDialogOpen] =
    useState(false)

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
        <form>
          <div className="space-y-4">
            <div className="border border-input rounded-lg p-6">
              <p className="font-lato font-medium text-lg text-blue-1000">
                Tipo de documento
              </p>
              <p className="font-lato font-normal text-base text-gray-800">
                Selecione o tipo de documento para configurar os campos de
                extração específicos.
              </p>

              <div className="flex items-end gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-lato font-normal text-sm text-gray-800">
                        Tipo de documento
                      </FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="font-bold text-blue-1000 lg:min-w-[200px]"
                  onClick={() => setNewDocumentTypeDialogOpen(true)}
                >
                  <Plus />
                  Novo tipo
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <Dialog
        open={newDocumentTypeDialogOpen}
        onOpenChange={setNewDocumentTypeDialogOpen}
      >
        <DialogContent className="bg-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar novo tipo de documento</DialogTitle>
            <DialogDescription>
              Crie um novo tipo de documento para configurar campos de extração
              específicos.
            </DialogDescription>
          </DialogHeader>

          <div>
            <DocumentTypeForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
