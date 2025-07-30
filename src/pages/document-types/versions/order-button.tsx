import { Button } from '@/components/ui/button'
import { useSearchParams } from 'react-router-dom'

export const OrderButton = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const order = searchParams.get('order') ?? 'asc'

  function handleOrder() {
    setSearchParams((params) => {
      params.set('order', order === 'asc' ? 'desc' : 'asc')
      return params
    })
  }

  return (
    <Button {...props} variant="ghost" className="px-0!" onClick={handleOrder}>
      {children}
    </Button>
  )
}
