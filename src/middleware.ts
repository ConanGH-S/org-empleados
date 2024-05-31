import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export function middleware (request: NextRequest) {
  if (request.nextUrl.pathname.match('/dashboard')) {
    const cookie = request.cookies.get('.AspNetCore.Identity.Application')
    if (!cookie?.value) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }
}

export const config: MiddlewareConfig = {
}
