import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import type { ChatResponse } from '@/types/http/chat-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import Markdown from 'react-markdown'

const schema = z.object({
  prompt: z.string().trim().min(1),
})

type ChatSchema = z.infer<typeof schema>

const MAX_QUESTION_LIMIT = 3

export const Chat = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<ChatSchema>({
    resolver: zodResolver(schema),
  })
  const { isAuthenticated } = useAuth()
  const [openMaxQuestionLimit, setOpenMaxQuestionLimit] = useState(false)
  const [questionsCounter, setQuestionsCounter] = useState(
    localStorage.getItem('questionsCounter')
      ? parseInt(localStorage.getItem('questionsCounter')!)
      : 0,
  )
  const [messages, setMessages] = useState<
    { text: string | null; type: 'question' | 'answer' }[]
  >(
    localStorage.getItem('messages')
      ? JSON.parse(localStorage.getItem('messages')!)
      : [],
  )

  const sendMessage = async (prompt: string) => {
    if (!isAuthenticated && questionsCounter >= MAX_QUESTION_LIMIT) {
      setOpenMaxQuestionLimit(true)
      return
    }

    setMessages((prev) => [...prev, { text: prompt, type: 'question' }])
    setValue('prompt', '')

    await api
      .post<ChatResponse>(
        isAuthenticated ? '/chat/questions/private' : '/chat/questions',
        { prompt },
      )
      .then((res) => {
        const { answer } = res.data
        setMessages((prev) => [...prev, { text: answer, type: 'answer' }])
        setQuestionsCounter((prev) => prev + 1)
      })
      .catch((err) => {
        setMessages((prev) => [...prev, { text: null, type: 'answer' }])
        if (err.response?.status === 429) {
          setOpenMaxQuestionLimit(true)
        }
      })
  }

  const onSubmit = ({ prompt }: ChatSchema) => {
    sendMessage(prompt)
  }

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem('questionsCounter', questionsCounter.toString())
  }, [questionsCounter])

  return (
    <div className="space-y-6 py-6 h-[calc(100vh-64px)]">
      <div className="bg-white rounded-2xl h-full px-4 md:px-8 lg:px-12 py-6 md:py-10 lg:py-12 flex flex-col justify-end">
        <div className="flex-1 overflow-auto">
          {messages.length ? (
            <div className="pb-10 flex flex-col gap-8">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    message.type === 'question' &&
                      'self-end p-2 bg-blue-50 rounded-xl',
                  )}
                >
                  {message.type === 'answer' ? (
                    <Markdown>{message.text}</Markdown>
                  ) : (
                    <>
                      {message.text || (
                        <span className="italic text-muted-foreground">
                          Sem resposta.
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col gap-8 items-center justify-center">
              Como posso ajudar?
            </div>
          )}
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

      <Dialog
        open={openMaxQuestionLimit}
        onOpenChange={setOpenMaxQuestionLimit}
      >
        <DialogContent className="bg-white">
          <DialogHeader>Limite de Perguntas Atingido</DialogHeader>
          <DialogDescription>
            Parece que você atingiu o limite de perguntas. Faça login ou
            cadastre-se para continuar usando a plataforma.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
            <Button asChild>
              <Link to="sign-in">Fazer Login</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
