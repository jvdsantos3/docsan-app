import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  branchActivityFormSchema,
  type BranchActivityFormSchema,
} from './schema'
import type { BranchActivity } from '@/types/branch-activity'
import { useEffect } from 'react'

type BranchActivityFormProps = {
  branchActivity?: BranchActivity
  isEdit?: boolean
  onCancel?: () => void
  onSubmit: (data: BranchActivityFormSchema) => Promise<void>
}

export const BranchActivityForm = ({
  branchActivity,
  isEdit = false,
  onCancel,
  onSubmit,
}: BranchActivityFormProps) => {
  const form = useForm<BranchActivityFormSchema>({
    resolver: zodResolver(branchActivityFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = async (data: BranchActivityFormSchema) => {
    await onSubmit(data)
  }

  useEffect(() => {
    if (branchActivity) {
      form.reset({
        name: branchActivity.name,
      })
    }
  }, [branchActivity, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da área de atuação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dê um nome para nova área de atuação"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            {isEdit ? 'Salvar alterações' : 'Adicionar tipo'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
