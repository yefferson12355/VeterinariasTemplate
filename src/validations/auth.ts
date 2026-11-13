import * as z from "zod"

import { emailSchema } from "@/validations/email"

export const userIDSchema = z
  .string({
    required_error: "ID użytkownika es obligatorio",
    invalid_type_error: "Los datos deben ser texto",
  })
  .min(1, {
    message: "ID debe tener al menos 1 znak",
  })
  .max(128, {
    message: "ID puede tener como máximo 128 caracteres",
  })

export const passwordSchema = z
  .string({
    required_error: "La contraseña es obligatoria",
    invalid_type_error: "Tipo de datos no válido",
  })
  .min(8, {
    message: "Contraseña debe tener al menos 8 caracteres",
  })
  .max(256, {
    message: "Contraseña nie puede tener más de 256 caracteres",
  })

export const signUpWithPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "La contraseña debe tener entre 8 y 256 caracteres e incluir una mayúscula, una minúscula, un número y un carácter especial",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "La contraseña es obligatoria",
    invalid_type_error: "Tipo de datos no válido",
  }),
})

export const passwordResetSchema = z.object({
  email: emailSchema,
})

export const passwordUpdateSchema = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "La contraseña debe tener entre 8 y 256 caracteres e incluir una mayúscula, una minúscula, un número y un carácter especial",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export const passwordUpdateSchemaExtended = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "La contraseña debe tener entre 8 y 256 caracteres e incluir una mayúscula, una minúscula, un número y un carácter especial",
      }
    ),
    confirmPassword: z.string(),
    resetPasswordToken: z
      .string({
        required_error: "El token para restablecer la contraseña es obligatorio",
        invalid_type_error: "Tipo de datos no válido",
      })
      .min(16)
      .max(512),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export const linkOAuthAccountSchema = z.object({
  userID: userIDSchema,
})

export type SignUpWithPasswordFormInput = z.infer<
  typeof signUpWithPasswordSchema
>

export type SignInWithPasswordFormInput = z.infer<
  typeof signInWithPasswordSchema
>

export type PasswordResetFormInput = z.infer<typeof passwordResetSchema>

export type PasswordUpdateFormInput = z.infer<typeof passwordUpdateSchema>

export type PasswordUpdateFormInputExtended = z.infer<
  typeof passwordUpdateSchemaExtended
>

export type LinkOAuthAccountInput = z.infer<typeof linkOAuthAccountSchema>
