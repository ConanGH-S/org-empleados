'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const createEmployeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1)
})

type TCreateEmployeeSchema = z.infer<typeof createEmployeeSchema>

export default function CreateEmployeeDialog () {
  const [isSending, setIsSending] = useState<boolean>(false)

  const form = useForm<TCreateEmployeeSchema>({ resolver: zodResolver(createEmployeeSchema) })
  const location = useRouter()

  const loginButtonContent = isSending ? 'Enviando...' : 'Enviar'

  const onSubmit = (data: TCreateEmployeeSchema): void => {
    setIsSending(true)
    fetch('http://localhost:5088/api/v1/Employee', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(() => {
        toast({
          variant: 'default',
          title: 'Empleado creado con éxito',
          duration: 4000
        })
        location.refresh()
      })
      .catch(error => {
        console.error(error)
        toast({
          variant: 'destructive',
          title: '¡Ups!',
          description: 'Ha ocurrido un error, inténtalo de nuevo',
          duration: 4000
        })
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild><Button variant='secondary' className='bg-green-500'>Crear empleado</Button></DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Crear nuevo empleado</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-right'>
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='firstName'
                        className='col-span-3'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-right'>
                      Apellidos
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='lastName'
                        className='col-span-3'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <DialogFooter>
              <Button type='submit' aria-disabled={isSending} disabled={isSending}>
                {isSending ? (<Loader2 className='mr-2 h-4 w-4 animate-spin' />) : null}
                <span>{loginButtonContent}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
