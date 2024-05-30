'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { loginRedirect } from '@/lib/actions'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type TLoginFormSchema = z.infer<typeof loginFormSchema>

export function LoginForm () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginFormSchema>({ resolver: zodResolver(loginFormSchema) })

  const onSubmit = (data: TLoginFormSchema) => {
    fetch('http://localhost:5088/login?useCookies=true&useSessionCookies=true', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(() => {
        loginRedirect()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register('email')} className='text-black' />
      {errors.email
        ? (<small>{errors.email.message}</small>)
        : null}
      <label>Password</label>
      <input {...register('password')} className='text-black' />
      {errors.password
        ? (<small>{errors.password.message}</small>)
        : null}
      <button type='submit'>
        Iniciar sesión
      </button>
    </form>
  )
}
