export class Fetch {
  public static async employeeData<T> (activeEmployees: boolean = true): Promise<Array<T[]>> {
    const res = await fetch(`http://localhost:5088/api/v1/Employee?activeEmployees=${activeEmployees}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json()
    return data
  }
}
