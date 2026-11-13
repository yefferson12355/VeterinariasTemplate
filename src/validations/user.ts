import * as z from "zod"

import { users } from "@/db/schema"
import { passwordSchema, userIDSchema } from "@/validations/auth"
import { emailSchema } from "@/validations/email"

export const userNameSchema = z
  .string({
    invalid_type_error: "El nombre y el apellido deben ser texto",
  })
  .optional()

export const userSchema = z.object({
  name: userNameSchema,
  surname: userNameSchema,
  role: z
    .enum(users.role.enumValues, {
      required_error: "Rol jest wymagana",
      invalid_type_error:
        "El rol debe ser uno de los valores permitidos",
    })
    .default("cliente"),
  email: emailSchema,
  password: passwordSchema.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    {
      message:
        "La contraseña debe tener entre 8 y 256 caracteres e incluir una mayúscula, una minúscula, un número y un carácter especial",
    }
  ),
})

export const getUserByEmailSchema = z.object({
  email: emailSchema,
})

export const getUserByIDSchema = z.object({
  id: userIDSchema,
})

export const getUserByIdSchema = getUserByIDSchema

export const getUserByResetPasswordTokenSchema = z.object({
  token: z.string(),
})

export const getUserByEmailVerificationTokenSchema = z.object({
  token: z.string(),
})

export const checkIfUserExistsSchema = z.object({
  id: userIDSchema,
})

export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>

export type GetUserByIDInput = z.infer<typeof getUserByIDSchema>

export type GetUserByIdInput = GetUserByIDInput

export type GetUserByResetPasswordTokenInput = z.infer<
  typeof getUserByResetPasswordTokenSchema
>

export type GetUserByEmailVerificationTokenInput = z.infer<
  typeof getUserByEmailVerificationTokenSchema
>

export type CheckIfUserExistsInput = z.infer<typeof checkIfUserExistsSchema>
