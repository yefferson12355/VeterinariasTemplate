import NextAuth from "next-auth"

import authConfig from "@/config/auth"
import {
  DEFAULT_SIGNIN_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT,
} from "@/config/defaults"

const { auth } = NextAuth(authConfig)

export const authRoutes = ["/logowanie", "/rejestracja", "/error"]
export const publicRoutes = [
  "/",
  "/polityka-prywatnosci",
  "/rezerwacja",
  "/rejestracja/potwierdz-email",
  "/rejestracja/potwierdz-email-ponownie",
  "/logowanie/haslo-reset",
  "/logowanie/haslo-aktualizacja",
]

export default auth((req) => {
  const authenticated = !!req.auth
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
  const isDevelopmentAdmin =
    process.env.NODE_ENV === "development" &&
    req.nextUrl.pathname.startsWith("/admin")

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (authenticated) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl))
    }
    return
  }

  if (!authenticated && !isPublicRoute && !isDevelopmentAdmin) {
    return Response.redirect(
      new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, req.nextUrl)
    )
  }

  return
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
