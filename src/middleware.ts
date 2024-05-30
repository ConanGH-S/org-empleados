import { NextResponse, type NextRequest } from 'next/server'

import { isAuthenticated } from './lib/actions'

export function middleware (request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard') {
    const auth = isAuthenticated(request)
    if (!auth) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
}
