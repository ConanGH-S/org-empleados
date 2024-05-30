import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  layoutType: 'center' | 'default'
}

export default function Layout ({ children, layoutType = 'default', className, ...props }: LayoutProps) {
  const layoutTypeClassName: Record<typeof layoutType, string> = {
    center: 'h-dvh grid items-center',
    default: 'h-dvh grid'
  } as const

  type TLayoutTypeClassName = keyof typeof layoutTypeClassName

  const classNames = [
    layoutTypeClassName[layoutType as TLayoutTypeClassName],
    className
  ]

  return <main className={cn(classNames)} {...props}>{children}</main>
}
