'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { loginRedirect } from '@/lib/actions'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type TLoginFormSchema = z.infer<typeof loginFormSchema>

export function LoginForm () {
  const [isPasswordInput, setIsPasswordInput] = useState<boolean>(true)
  const [isSendingLogin, setIsSendingLogin] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<TLoginFormSchema>({ resolver: zodResolver(loginFormSchema) })

  const loginButtonContent = isSendingLogin ? 'Enviando...' : 'Enviar'

  const onSubmit = (data: TLoginFormSchema): void => {
    setIsSendingLogin(true)
    fetch('http://localhost:5088/login?useCookies=true&useSessionCookies=true', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          loginRedirect()
        } else {
          toastError()
          throw new Error('Login failed')
        }
      })
      .catch((e: Error) => {
        console.error(e.message)
        setIsSendingLogin(false)
      })
  }

  const showPassword = (): void => {
    setIsPasswordInput((prev) => !prev)
  }

  const toastError = (): void => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.'
    })
  }

  return (
    <Card className='max-w-md w-full mx-auto'>
      <CardHeader>
        <h1>Ingresa tus credenciales</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder='email@domain.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-[1fr_auto] gap-1'>
                      <Input type={isPasswordInput ? 'password' : 'text'} placeholder='*****' {...field} />
                      <Button type='button' onClick={showPassword}><EyeIcon /></Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' aria-disabled={isSendingLogin} disabled={isSendingLogin}>
              {isSendingLogin ? (<Loader2 className='mr-2 h-4 w-4 animate-spin' />) : null}
              <span>{loginButtonContent}</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
