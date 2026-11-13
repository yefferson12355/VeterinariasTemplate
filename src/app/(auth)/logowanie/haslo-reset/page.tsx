import { type Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordResetForm } from "@/components/forms/auth/password-reset-form"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Restablecimiento de contraseña",
  description: "Introduce tu correo para recibir el enlace para restablecer la contraseña",
}

export default function PasswordReset(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Restablecimiento de contraseña</CardTitle>
          <CardDescription>
            El enlace se enviará a la dirección indicada
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <PasswordResetForm />
          <Link
            aria-label="Volver do la página de inicio de sesión"
            href="/logowanie"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancelar
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
