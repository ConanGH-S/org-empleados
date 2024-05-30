import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  layoutType: 'center' | 'default'
}

export default function LayoutGrid ({ children, layoutType = 'default', className, ...props }: LayoutProps) {
  const layoutTypeClassName: Record<typeof layoutType, string> = {
    center: 'h-dvh grid items-center px-4',
    default: 'h-dvh grid px-4'
  } as const

  type TLayoutTypeClassName = keyof typeof layoutTypeClassName

  const classNames = [
    layoutTypeClassName[layoutType as TLayoutTypeClassName],
    className
  ]

  return <main className={cn(classNames)} {...props}>{children}</main>
}
