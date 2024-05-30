'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

import { Employee } from './columns'

interface EditEmployeeDialogProps {
  employee: Employee
}

const editEmployeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1)
})

type TEditEmployeeSchema = z.infer<typeof editEmployeeSchema>

export default function EditEmployeeDialog ({ employee }: EditEmployeeDialogProps) {
  const [isSendingLogin, setIsSendingLogin] = useState<boolean>(false)

  const form = useForm<TEditEmployeeSchema>({ resolver: zodResolver(editEmployeeSchema) })
  const location = useRouter()
  const loginButtonContent = isSendingLogin ? 'Enviando...' : 'Enviar'

  const onSubmit = (data: TEditEmployeeSchema): void => {
    setIsSendingLogin(true)
    fetch(`http://localhost:5088/api/v1/Employee/${employee.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(() => {
        toast({
          variant: 'default',
          title: 'Empleado actualizado con éxito',
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
        setIsSendingLogin(false)
      })
  }

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Editar empleado {employee.firstName} {employee.lastName}</DialogTitle>
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
                      defaultValue={employee.firstName}
                      className='col-span-3'
                      {...field}
                      value={field.value}
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
                      defaultValue={employee.lastName}
                      className='col-span-3'
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <DialogFooter>
            <Button type='submit' aria-disabled={isSendingLogin} disabled={isSendingLogin}>
              {isSendingLogin ? (<Loader2 className='mr-2 h-4 w-4 animate-spin' />) : null}
              <span>{loginButtonContent}</span>
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
