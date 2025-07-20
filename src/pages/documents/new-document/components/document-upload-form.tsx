import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronRight, FileText, Plus, UploadIcon, XIcon } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import { CreateDocumentTypeDialog } from '@/components/dialogs/create-document-type-dialog'
import { useDocumentMultiStepForm } from '../use-document-multi-step-form'
import { formatBytes, useFileUpload } from '@/hooks/use-file-upload'

export const DocumentUploadForm = () => {
  const maxSize = 10 * 1024 * 1024 // 10MB default
  const acceptedFileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  const { nextStep } = useDocumentMultiStepForm()
  const [createDocTypeDialog, setCreateDocTypeDialog] = useState(false)
  const form = useForm()
  const [
    { files, isDragging },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: acceptedFileTypes.join(','),
  })

  const file = files[0]

  const onSubmit = () => {
    // Handle form submission logic here
    nextStep()
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-lato font-bold text-[21px] text-blue-1000">
          Upload de documentos.
        </h2>
        <p className="font-lato font-normal text-base text-gray-800 mt-2">
          Envie arquivos PDF ou imagens (JPG/PNG) para extrair os dados
          configurados.
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

            <div className="flex flex-col gap-2">
              {/* Drop area */}
              <div
                role="button"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
              >
                <input
                  {...getInputProps()}
                  className="sr-only"
                  aria-label="Upload file"
                  disabled={Boolean(file)}
                />

                {file ? (
                  <div
                    key={file.id}
                    className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2 md:w-lg"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText
                        className="size-5 shrink-0"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium">
                          {file.file.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatBytes(file.file.size)} /{' '}
                          {file.file.type.split('/')[1]?.toUpperCase() ||
                            'UNKNOWN'}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                      onClick={() => removeFile(files[0]?.id)}
                      aria-label="Remove file"
                    >
                      <XIcon className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                    <div
                      className="mb-2 flex shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <UploadIcon className="size-9" />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="mb-4 mt-2"
                      onClick={openFileDialog}
                    >
                      Selecionar arquivo
                    </Button>
                    <p className="mb-1.5 text-sm font-medium">
                      Clique para fazer upload ou arraste e solte
                    </p>
                    <p className="text-muted-foreground text-xs">
                      PDF, DOC, DOCX, JPG, PNG (máx. {maxSize}MB)
                    </p>
                  </div>
                )}
              </div>
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
