import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type SignUpSelectorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SignUpSelectorDialog = ({
  open,
  onOpenChange,
}: SignUpSelectorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <img
            className="w-[8.6875rem] mx-auto mb-4"
            src="/logo-02.svg"
            alt="Docsan logo"
          />
          <DialogTitle className="font-lato font-bold text-xl text-center">
            Como você deseja usar a DocSan?
          </DialogTitle>
          <DialogDescription className="font-lato font-medium text-gray-800 text-center text-lg">
            Escolha uma das opções abaixo para continuar com o cadastro.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex gap-4">
            <div className="border border-blue-source rounded-md flex flex-col justify-center items-center gap-3 px-3 py-4">
              <img src="/banner-1.svg" alt="Banner profissional" />
              <p className="font-lato font-medium text-lg text-center">
                Quero oferecer meus serviços de consultoria regulatória.
              </p>
              <Button variant="outline" className="w-full font-bold" asChild>
                <Link to={'/sign-up/professional'}>Sou profissional</Link>
              </Button>
            </div>
            <div className="border border-blue-source rounded-md flex flex-col justify-center items-center gap-3 px-3 py-4">
              <img src="/banner-2.svg" alt="Banner empresarial" />
              <p className="font-lato font-medium text-lg text-center">
                Quero contratar serviços de consultoria para minha empresa.
              </p>
              <Button variant="outline" className="w-full font-bold" asChild>
                <Link to={'/sign-up/enterprise'}>Sou empresa</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
