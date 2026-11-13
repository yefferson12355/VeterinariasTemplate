import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { markEmailAsVerified } from "@/actions/email"
import { getUserByEmailVerificationToken } from "@/actions/user"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Email Verification",
  description: "Verify your email address to continue",
}

export interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function VerifyEmailPage({
  searchParams,
}: Readonly<VerifyEmailPageProps>): Promise<JSX.Element> {
  const emailVerificationToken = searchParams.token as string

  if (emailVerificationToken) {
    const user = await getUserByEmailVerificationToken({
      token: emailVerificationToken,
    })

    if (!user) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
          <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
            <CardHeader>
              <CardTitle>Token no válido</CardTitle>
              <CardDescription>
                Volver do la página de registro y selecciona &quot;enviar de nuevo&quot;
                para recibir nowego linka
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                aria-label="Go back to sign in page"
                href="/rejestracja"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                <Icons.arrowLeft className="mr-2 size-4" />
                <span className="sr-only">Volver</span>
                Volver
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }

    const message = await markEmailAsVerified({
      token: emailVerificationToken,
    })
    if (message !== "success") redirect("/rejestracja")

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>El correo fue verificado</CardTitle>
            <CardDescription>
              Puedes iniciar sesión y usar tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Ir a la página de inicio de sesión"
              href="/logowanie"
              className={buttonVariants({ className: "w-full" })}
            >
              <span className="sr-only">Ir a storny logowania</span>
              Ir a la página de inicio de sesión
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Token no válido</CardTitle>
            <CardDescription>
              Volver do la página de registro y selecciona &quot;enviar de nuevo&quot;
              para recibir nowego linka
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Go back to sign up page"
              href="/rejestracja"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <Icons.arrowLeft className="mr-2 size-4" />
              <span className="sr-only">Volver</span>
              Volver
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
