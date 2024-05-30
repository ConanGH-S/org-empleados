import { cookies } from 'next/headers'

async function fetchData () {
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
  const data: any[] = await fetchData()
  return (
    <div>
      hola
      {data.map((data: any) => {
        return (
          <p key={data.id}>Firstname {data.firstName}</p>
        )
      })}
    </div>
  )
}
