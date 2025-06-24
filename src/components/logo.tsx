import { cn } from '@/lib/utils'
import type React from 'react'

type LogoProps = React.HTMLAttributes<HTMLImageElement>

export const Logo = ({ className }: LogoProps) => {
  return (
    <img
      className={cn('w-20', className)}
      src="/logo-02.svg"
      alt="Docsan logo"
    />
  )
}
