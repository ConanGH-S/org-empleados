'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, DeleteIcon, EditIcon, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

import EditEmployeeDialog from './editEmployeeDialog'

export interface Employee {
  id: number
  firstName: string
  lastName: string
  fkIdRole: number
  updatedAt: string
  deletedAt: string
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombres
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Apelidos
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'deletedAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { deletedAt } = row.original
      const employeeStatus = deletedAt === null ? 'Activo' : 'No activo' as const
      return (
        <span className={cn(employeeStatus === 'Activo' ? 'text-green-500' : 'text-red-500')}>{employeeStatus}</span>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(`${employee.firstName} ${employee.lastName}`)}
              >
                Copiar nombre completo del empleado
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DialogTrigger asChild>
                <DropdownMenuItem className='text-yellow-500 flex justify-between'><span>Editar empleado</span><EditIcon className='size-5' /></DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem className='text-red-500 flex justify-between'><span>Eliminar empleado</span><DeleteIcon className='size-5' /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditEmployeeDialog employee={employee} />
        </Dialog>
      )
    }
  }
]
