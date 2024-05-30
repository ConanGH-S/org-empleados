'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
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

  const { toast } = useToast()
  const form = useForm<TLoginFormSchema>({ resolver: zodResolver(loginFormSchema) })

  const onSubmit = (data: TLoginFormSchema): void => {
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
        }
      })
      .catch((e) => {
        console.error(e)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card className='max-w-md w-full mx-auto'>
          <CardHeader>
            <h1>Ingresa tus credenciales</h1>
          </CardHeader>
          <CardContent>
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
                    <div className='grid grid-cols-[1fr_auto]'>
                      <Input type={isPasswordInput ? 'password' : 'text'} placeholder='*****' {...field} />
                      <Button type='button' onClick={showPassword}><EyeIcon /></Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
