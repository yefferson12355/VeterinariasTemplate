import type { Metadata } from "next"
import Link from "next/link"
import { getUserByResetPasswordToken } from "@/actions/user"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordUpdateForm } from "@/components/forms/auth/password-update-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Actualizar contraseña",
  description: "Establece una nueva contraseña",
}

interface PasswordUpdatePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PasswordUpdatePage({
  searchParams,
}: Readonly<PasswordUpdatePageProps>): Promise<JSX.Element> {
  if (searchParams.token) {
    const user = await getUserByResetPasswordToken({
      token: String(searchParams.token),
    })

    if (!user) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
          <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
            <CardHeader>
              <CardTitle>Código de restablecimiento no válido</CardTitle>
              <CardDescription>
                Volver do la página de inicio de sesión i inténtalo de nuevo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                aria-label="Volver a iniciar sesión"
                href="/logowanie"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                <Icons.arrowLeft className="mr-2 size-4" />
                <span className="sr-only">Inténtalo de nuevo</span>
                Inténtalo de nuevo
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Actualizar contraseña</CardTitle>
            <CardDescription>Establece tu nueva contraseña</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <PasswordUpdateForm
              resetPasswordToken={String(searchParams.token)}
            />
            <Link
              aria-label="Cancelar aktualizację hasła"
              href="/logowanie"
              className={buttonVariants({ variant: "outline" })}
            >
              <span className="sr-only">Cancelar aktualizację hasła</span>
              Cancelar
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
            <CardTitle>Falta el código de restablecimiento</CardTitle>
            <CardDescription>
              Volver do la página de inicio de sesión i inténtalo de nuevo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Volver a iniciar sesión"
              href="/logowanie"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <Icons.arrowLeft className="mr-2 size-4" />
              <span className="sr-only">Inténtalo de nuevo</span>
              Inténtalo de nuevo
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
