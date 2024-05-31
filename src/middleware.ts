import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export function middleware (request: NextRequest) {
  if (request.nextUrl.pathname.match('/dashboard')) {
    const cookie = request.cookies.get('.AspNetCore.Identity.Application')?.value
    if (!cookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }
}

export const config: MiddlewareConfig = {
}
