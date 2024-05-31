'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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

const passwordRegex: Readonly<RegExp> = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(passwordRegex, 'La contraseña debe tener 1 numero, mayuscula y carácter especial')
})

type TRegisterFormSchema = z.infer<typeof registerFormSchema>

export default function RegisterDialogForm () {
  const [isPasswordInput, setIsPasswordInput] = useState<boolean>(true)
  const [isSending, setisSending] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<TRegisterFormSchema>({ resolver: zodResolver(registerFormSchema) })

  const loginButtonContent = isSending ? 'Enviando...' : 'Enviar'

  const onSubmit = (data: TRegisterFormSchema): void => {
    setisSending(true)
    fetch('http://localhost:5088/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          toast({
            variant: 'default',
            title: 'Usuario registrado con éxito.',
            duration: 4000
          })
          form.reset()
        } else {
          toastError()
          throw new Error('Login failed')
        }
      })
      .catch((e: Error) => {
        console.error(e.message)
      })
      .finally(() => {
        setisSending(false)
      })
  }

  const showPassword = (): void => {
    setIsPasswordInput((prev) => !prev)
  }

  const toastError = (): void => {
    toast({
      variant: 'destructive',
      title: '¡Ha ocurrido un error!',
      description: 'Cuenta existente',
      duration: 4000
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Regístrate</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Regístra tus credenciales</DialogTitle>
          <DialogDescription>
            Una vez lo hagas puedes cerrar esta ventana e iniciar sesión
          </DialogDescription>
        </DialogHeader>
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
            <Button type='submit' aria-disabled={isSending} disabled={isSending}>
              {isSending ? (<Loader2 className='mr-2 h-4 w-4 animate-spin' />) : null}
              <span>{loginButtonContent}</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
