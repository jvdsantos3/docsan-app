import { cn } from '@/lib/utils'
import type React from 'react'

type SimpleLogoProps = React.HTMLAttributes<HTMLImageElement>

export const SimpleLogo = ({ className }: SimpleLogoProps) => {
  return (
    <img
      className={cn('w-20', className)}
      src="/logo-03.svg"
      alt="Docsan logo"
    />
  )
}
