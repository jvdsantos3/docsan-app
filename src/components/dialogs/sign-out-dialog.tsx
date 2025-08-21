import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SignOutDialog = ({ open, onOpenChange }: SignOutDialogProps) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/sign-in', { replace: true })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Tem certeza de que deseja sair?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleLogout}>Sair</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
