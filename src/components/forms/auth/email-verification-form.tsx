"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resendEmailVerificationLink } from "@/actions/email"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import {
  emailVerificationSchema,
  type EmailVerificationFormInput,
} from "@/validations/email"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export function EmailVerificationForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<EmailVerificationFormInput>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: EmailVerificationFormInput): void {
    startTransition(async () => {
      try {
        const message = await resendEmailVerificationLink({
          email: formData.email,
        })

        switch (message) {
          case "not-found":
            toast({
              title: "No existe un usuario con ese correo electrónico",
              variant: "destructive",
            })
            form.reset()
            break
          case "verified":
            toast({
              title: "Tu correo ya está verificado",
              description: "Volver do la página de inicio de sesión i intenta iniciar sesión",
            })
            break
          case "success":
            toast({
              title: "El enlace de verificación fue enviado",
              description:
                "Haz clic en el enlace recibido para completar la verificación",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Error al enviar el enlace de verificación",
              description: "Inténtalo de nuevo",
              variant: "destructive",
            })
            router.push("/rejestracja")
        }
      } catch (error) {
        toast({
          title: "Algo salió mal",
          description: "Inténtalo de nuevo",
          variant: "destructive",
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jankowalski@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              <span>Enviando...</span>
            </>
          ) : (
            <span>Enviar link</span>
          )}
          <span className="sr-only">
            Envía el enlace de verificación al correo indicado
          </span>
        </Button>
      </form>
    </Form>
  )
}
