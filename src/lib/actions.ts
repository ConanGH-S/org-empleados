'use server'

import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const isAuthenticated = (request: NextRequest): boolean => {
  let isAuth: boolean = false
  const token = request.cookies.get('.AspNetCore.Identity.Application')
  console.log(token)
  fetch('http://localhost:5088/api/v1/User/auth', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${token?.name}=${token?.value}`
    },
    credentials: 'include'
  })
    .then(res => { isAuth = res.ok })
    .catch(() => { isAuth = false })
  return isAuth
}

export const loginRedirect = () => {
  redirect('/dashboard')
}
