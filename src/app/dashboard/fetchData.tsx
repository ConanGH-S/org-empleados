'use client'

import { useEffect, useState } from 'react'

export default function Data () {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    fetch('http://localhost:5088/api/v1/Employee', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      setData(data)
    })
      .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <h1>Data</h1>
      {Array.isArray(data) && data.map((data: any) => (
        <p key={data.id}>{data.firstName}</p>
      ))}
    </div>
  )
}
