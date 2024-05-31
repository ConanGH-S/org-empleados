'use server'

import { redirect } from 'next/navigation'

export const loginRedirect = () => {
  redirect('/dashboard')
}

export const logoutRedirect = () => {
  redirect('/')
}
