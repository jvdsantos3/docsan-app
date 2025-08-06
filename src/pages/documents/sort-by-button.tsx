import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router-dom'

type SortByButtonProps = PropsWithChildren & {
  sortBy: 'name' | 'type' | 'status' | 'duedate' | 'createdAt'
}

export const SortByButton = ({
  children,
  sortBy,
  ...props
}: SortByButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const direction = searchParams.get('direction') ?? 'asc'

  const handleSort = () => {
    setSearchParams((prev) => {
      prev.set('sort', sortBy)
      prev.set('direction', direction === 'asc' ? 'desc' : 'asc')
      return prev
    })
  }

  return (
    <Button {...props} variant="ghost" className="px-0!" onClick={handleSort}>
      {children}
      <ArrowUpDown />
    </Button>
  )
}
