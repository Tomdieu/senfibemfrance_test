import { createI18nMiddleware } from 'next-international/middleware'
import { auth } from '@/auth'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
})

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings']

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  
  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.includes(route)
  )
  
  const session = await auth()
  
  if (isProtectedRoute && !session) {
    // Redirect to login
    const locale = pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}/connexion`, req.url))
  }
  
  return I18nMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}