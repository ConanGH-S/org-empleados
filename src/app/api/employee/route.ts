import { cookies } from 'next/headers'

export async function GET (request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('.AspNetCore.Identity.Application') // tiene la cookie
  console.log(`${token?.name}=${token?.value}`)
  try {
    const res = await fetch('http://localhost:5088/api/v1/Employee', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${token?.name}=${token?.value}`
      },
      credentials: 'include'
    })
    const data = await res.json()
    return Response.json({ data })
  } catch (error: any) {
    throw new Error(error.message)
  }
}
