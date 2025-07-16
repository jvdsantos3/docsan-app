import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  documentTypeFormSchema,
  MAX_FIELDS,
  type DocumentTypeFormSchema,
} from './schema'
import { cn } from '@/lib/utils'

type DocumentTypeFormProps = {
  onCancel?: () => void
  onSubmit: (data: DocumentTypeFormSchema) => void
}

export const DocumentTypeForm = ({
  onCancel,
  onSubmit,
}: DocumentTypeFormProps) => {
  const form = useForm<DocumentTypeFormSchema>({
    resolver: zodResolver(documentTypeFormSchema),
    defaultValues: {
      name: '',
      fields: [{ name: 'Data de vencimento', type: 'date', required: true }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
    rules: { maxLength: MAX_FIELDS, minLength: 1, required: true },
  })

  const handleAddField = () => {
    if (fields.length < MAX_FIELDS) {
      append({ name: '', type: 'text', required: false })
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = (data: DocumentTypeFormSchema) => {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do tipo de documento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dê um nome ao novo tipo de documento"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {fields.map((field, index) => (
              <div
                className="border border-input rounded-lg p-4 relative space-y-4"
                key={field.id}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                  title="remover campo"
                >
                  <Trash2 className="text-[#DA1717]" />
                </Button>

                <div className="font-medium text-lg">Campo {index + 1}</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-4">
                  <FormField
                    control={form.control}
                    name={`fields.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do campo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex.: Nome do cliente"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de dado</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione um tipo de dado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="text">Texto</SelectItem>
                            <SelectItem value="number">Número</SelectItem>
                            <SelectItem value="date">Data</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`fields.${index}.required`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-center gap-2">
                          <FormControl>
                            <Checkbox
                              defaultChecked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked)
                              }
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Obrigatório
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>
            ))}

            {fields.length < MAX_FIELDS && (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    'w-full border border-gray-300 border-dashed text-gray-500 h-20',
                    form.formState.errors.fields &&
                      !fields.length &&
                      'border-red-500 text-destructive',
                  )}
                  onClick={handleAddField}
                >
                  <Plus />
                  Adicionar campo {fields.length + 1}/{MAX_FIELDS}
                </Button>
                {form.formState.errors.fields && (
                  <FormMessage>
                    {form.formState.errors.fields.message}
                  </FormMessage>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar tipo</Button>
        </div>
      </form>
    </Form>
  )
}
