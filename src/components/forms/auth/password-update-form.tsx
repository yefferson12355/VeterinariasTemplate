"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import {
  passwordUpdateSchema,
  type PasswordUpdateFormInput,
} from "@/validations/auth"

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
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

interface PasswordUpdateFormProps {
  resetPasswordToken: string
}

export function PasswordUpdateForm({
  resetPasswordToken,
}: PasswordUpdateFormProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<PasswordUpdateFormInput>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: PasswordUpdateFormInput): void {
    startTransition(async () => {
      try {
        const message = await updatePassword({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          resetPasswordToken,
        })

        switch (message) {
          case "expired":
            toast({
              title: "Token no válido o ausente",
              description: "Inténtalo de nuevo",
              variant: "destructive",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          case "success":
            toast({
              title: "Contraseña fue actualizada",
              description:
                "Ahora puedes iniciar sesión con tu nueva contraseña",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Błąd przy actualizar la contraseña",
              description: "Inténtalo de nuevo",
              variant: "destructive",
            })
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmación de contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
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
              <span>Updating...</span>
            </>
          ) : (
            <span>Confirmar contraseña</span>
          )}
          <span className="sr-only">Confirmar nueva contraseña</span>
        </Button>
      </form>
    </Form>
  )
}
