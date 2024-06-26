'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import { RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Fetch } from '@/lib/fetch'

import CreateEmployeeDialog from './createEmployeeDialog'
import DeleteEmployeeDialog from './deleteEmployeeDialog'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue> ({
  columns
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<any[]>([])

  const updateDataTable = () => {
    Fetch.employeeData(true)
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    Fetch.employeeData(true)
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const changeFilter = (filter: string) => {
    const filterSelected = filter === 'activo'
    fetch(`http://localhost:5088/api/v1/Employee?activeEmployees=${filterSelected}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      sorting,
      rowSelection
    }
  })

  const originalEmployees = table.getFilteredSelectedRowModel().flatRows.map(({ original }: any) => original.id)

  return (
    <>
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} de{' '}
        {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
      </div>
      <div className='flex flex-col flex-wrap md:flex-row justify-between py-4 gap-4'>
        <Input
          placeholder='Filtrar nombres...'
          value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)}
          className='max-w-sm mx-auto md:mx-0'
        />
        <section className='flex flex-col md:flex-row justify-end sm:justify-center items-center
         gap-3'
        >
          <section className='flex gap-3'>
            <Select defaultValue='activo' onValueChange={(event) => changeFilter(event)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Selecciona el estado' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem id='activo' value='activo'>activo</SelectItem>
                  <SelectItem id='inactivo' value='inactivo'>inactivo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant='ghost' onClick={updateDataTable} className='group'><RotateCw className='group-hover:animate-spin' /></Button>
          </section>
          <section className='flex gap-3'>
            <CreateEmployeeDialog refreshData={updateDataTable} />
            <DeleteEmployeeDialog selectedEmployees={originalEmployees} refreshData={updateDataTable} />
          </section>
        </section>
      </div>
      <ScrollArea className='whitespace-nowrap rounded-md border'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='text-center'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length
                ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className='text-center'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )
                : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                  )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </>
  )
}
