import * as z from "zod"

export const emailSchema = z
  .string({
    required_error: "El correo electrónico es obligatorio",
    invalid_type_error: "Tipo de datos no válido",
  })
  .min(5, {
    message: "El correo electrónico debe tener al menos 5 caracteres",
  })
  .max(64, {
    message: "El correo electrónico no puede tener más de 64 caracteres",
  })
  .email({
    message: "Introduce un correo electrónico válido",
  })
  .transform((value) => value.trim().toLowerCase())

export const emailVerificationSchema = z.object({
  email: emailSchema,
})

export const markEmailAsVerifiedSchema = z.object({
  token: z.string(),
})

export const checkIfEmailVerifiedSchema = z.object({
  email: emailSchema,
})

export const contactFormSchema = z.object({
  email: emailSchema,
  firstName: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "Tipo de datos no válido",
  }),
  lastName: z.string({
    required_error: "Apellido es obligatorio",
    invalid_type_error: "Tipo de datos no válido",
  }),
  // TODO: Consider adding a regex to further validate the phone number
  phone: z.string({
    required_error: "El tel?fono es obligatorio",
    invalid_type_error: "Tipo de datos no válido",
  }),
  message: z
    .string({
      required_error: "El mensaje es obligatorio",
      invalid_type_error: "Formato de datos no válido",
    })
    .max(10240, {
      message: "El mensaje no puede tener más de 10240 caracteres",
    }),
  rodo: z.boolean().default(false),
})

export type EmailVerificationFormInput = z.infer<typeof emailVerificationSchema>

export type MarkEmailAsVerifiedInput = z.infer<typeof markEmailAsVerifiedSchema>

export type CheckIfEmailVerifiedInput = z.infer<
  typeof checkIfEmailVerifiedSchema
>

export type ContactFormInput = z.infer<typeof contactFormSchema>
