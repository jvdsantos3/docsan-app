import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  prompt: z.string().trim(),
})

type ChatSchema = z.infer<typeof schema>

export const Chat = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChatSchema>({
    resolver: zodResolver(schema),
  })
  const { isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<string[]>([])

  const sendMessage = async (prompt: string) => {
    if (!prompt) return

    const response = await api.post(
      isAuthenticated ? '/chat/questions/private' : '/chat/questions',
      { prompt },
    )

    console.log(response.data)
  }

  const onSubmit = ({ prompt }: ChatSchema) => {
    sendMessage(prompt)
  }

  return (
    <div className="space-y-6 py-6 h-full">
      <div className="bg-white rounded-2xl h-full px-4 md:px-8 lg:px-12 py-6 md:py-10 lg:py-12 flex flex-col justify-end">
        <div className="flex-1 overflow-auto">
          <div className="pb-10 flex flex-col gap-8">
            <div className="self-end p-2 bg-blue-50 rounded-xl">
              Primeira pergunta feita pelo usuário
            </div>
            <div>
              Esta é uma simulação de resposta para demonstração da plataforma
              DocSan. Em uma implementação real, a resposta seria gerada por um
              modelo de IA especializado em questões regulatórias.
            </div>
            <div className="self-end p-2 bg-blue-50 rounded-xl">
              Segunda pergunta feita pelo usuário
            </div>
            <div>
              Esta é uma simulação de resposta para demonstração da plataforma
              DocSan. Em uma implementação real, a resposta seria gerada por um
              modelo de IA especializado em questões regulatórias.
            </div>
            <div className="self-end p-2 bg-blue-50 rounded-xl">
              Terceira pergunta feita pelo usuário
            </div>
            <div>
              Esta é uma simulação de resposta para demonstração da plataforma
              DocSan. Em uma implementação real, a resposta seria gerada por um
              modelo de IA especializado em questões regulatórias.
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <Input
                {...register('prompt')}
                placeholder="Digite aqui a sua dúvida..."
                className={cn(
                  'h-[3.5rem] w-full pl-4 pr-36 py-2 border rounded-lg text-gray-800 text-body-sm',
                  'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200/50',
                )}
              />

              <Button
                type="submit"
                className="absolute right-4 top-[50%] -translate-y-[50%] text-white rounded-r-lg hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                Perguntar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
