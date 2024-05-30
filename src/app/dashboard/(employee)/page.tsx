import { cookies } from 'next/headers'

import LayoutGrid from '@/components/core/Layout'

import { Employee, columns } from './columns'
import { DataTable } from './dataTable'

async function fetchData (): Promise<Array<Employee>> {
  const cookieStore = cookies()
  const token = cookieStore.get('.AspNetCore.Identity.Application') // tiene la cookie
  const res = await fetch('http://localhost:5088/api/v1/Employee', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${token?.name}=${token?.value}`
    },
    credentials: 'include'
  })
  const data = await res.json()
  return data
}

export default async function Page () {
  const data = await fetchData()
  return (
    <LayoutGrid layoutType='default' className='container mx-auto gap-4 py-6 h-full'>
      <h2>Lista de empleados</h2>
      <DataTable columns={columns} data={data} />
    </LayoutGrid>
  )
}
