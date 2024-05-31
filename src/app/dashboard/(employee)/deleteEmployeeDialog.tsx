'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'

interface DeleteEmployeeDialogProps {
  selectedEmployees: any[]
  refreshData: () => void
}

export default function DeleteEmployeeDialog ({ selectedEmployees, refreshData }: DeleteEmployeeDialogProps) {
  const [isSending, setIsSending] = useState<boolean>(false)

  const isEmptySelectedEmployees = selectedEmployees.length === 0
  const ButtonContent = isSending ? 'Enviando...' : 'Enviar'

  const fetchDelete = async (id: number): Promise<void> => {
    try {
      await fetch(`http://localhost:5088/api/v1/Employee/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(selectedEmployees),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteEmployees = async (): Promise<void> => {
    if (isEmptySelectedEmployees) return
    setIsSending(true)
    try {
      for await (const id of selectedEmployees) {
        fetchDelete(id)
          .catch(() => {
            throw new Error('Ha ocurrido un error, inténtalo de nuevo')
          })
      }
      setIsSending(false)
      refreshData()
      toast({
        variant: 'default',
        title: 'Empleado(s) actualizado con éxito.',
        description: `Número afectado: ${selectedEmployees.length}`,
        duration: 4000
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: '¡Ups!',
        description: 'Ha ocurrido un error, inténtalo de nuevo',
        duration: 4000
      })
      setIsSending(false)
      refreshData()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild><Button variant='secondary' className='bg-red-500'>Eliminar empleado(s)</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogDescription>
            Se eliminarán {selectedEmployees.length}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type='button' variant='secondary' className='bg-red-500' onClick={deleteEmployees} aria-disabled={isSending || isEmptySelectedEmployees} disabled={isSending || isEmptySelectedEmployees}>
            {isSending ? (<Loader2 className='mr-2 h-4 w-4 animate-spin' />) : null}
            <span>{ButtonContent}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
