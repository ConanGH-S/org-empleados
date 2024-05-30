import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function Footer ({ children, className, ...props }: FooterProps) {
  const defaultClasses = 'w-full px-4 py-6' as const

  const classNames = [
    defaultClasses,
    className
  ]

  return (
    <footer className={cn(classNames)} {...props}>
      {children}
    </footer>
  )
}
