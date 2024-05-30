import { ReactNode } from 'react'

import Navbar from '@/components/core/Navbar'

export default function DashboardLayout ({ children }: {children: ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
