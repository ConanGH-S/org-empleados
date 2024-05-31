import LayoutGrid from '@/components/core/Layout'

import { columns } from './columns'
import { DataTable } from './dataTable'

export default async function Page () {
  return (
    <LayoutGrid layoutType='default' className='container mx-auto gap-4 py-6 h-full'>
      <h2>Lista de empleados activos</h2>
      <DataTable columns={columns} />
    </LayoutGrid>
  )
}
