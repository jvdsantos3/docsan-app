import { Button } from '@/components/ui/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CornerUpLeft } from 'lucide-react'
import { ResetPasswordForm } from '@/components/forms/reset-password-form'

export const ResetPassword = () => {
  const { token } = useParams<{ token: string }>()

  const navigate = useNavigate()

  return (
    <>
      <div className="md:w-[28.125rem] lg:w-[28.125rem] bg-white border border-blue-source rounded-2xl m-2 md:m-0 py-5 px-4 md:py-10 md:px-8 flex flex-col items-center gap-10">
        <Button
          type="button"
          variant="link"
          className="text-blue-source mr-auto"
          onClick={() => navigate('/sign-in')}
        >
          <CornerUpLeft /> Voltar
        </Button>

        <Link to={'/'}>
          <img className="w-23 h-28" src="/padlock.svg" alt="Padlock" />
        </Link>

        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium text-gray-950">
              Redefinir sua senha
            </h1>
            <p className="font-lato font-normal text-[#7D85A0]">
              Escolha uma senha forte para proteger sua conta.
            </p>
          </div>

          <ResetPasswordForm token={token!} />
        </div>
      </div>
    </>
  )
}
