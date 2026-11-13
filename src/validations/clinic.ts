import * as z from "zod"

export const clinicIDSchema = z
  .string({
    required_error: "ID kliniki es obligatorio",
    invalid_type_error: "Los datos deben ser texto",
  })
  .min(1, {
    message: "ID debe tener al menos 1 znak",
  })
  .max(128, {
    message: "ID puede tener como máximo 32 caracteres",
  })

export const clinicSchema = z.object({
  latitude: z
    .string({
      required_error: "Latitud jest wymagana",
      invalid_type_error: "Latitud debe ser texto",
    })
    .max(24, {
      message: "Latitud puede tener como máximo 24 caracteres",
    })
    .regex(/^(-?[1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
      message: "Valor no válido de latitud",
    }),
  longitude: z
    .string({
      required_error: "Longitud jest wymagana",
      invalid_type_error: "Longitud debe ser texto",
    })
    .max(24, {
      message: "Longitud puede tener como máximo 24 caracteres",
    })
    .regex(/^(0|([1-9]|[1-9]\d|1[0-7]\d)(\.\d+)?)$|^180(\.0+)?$/, {
      message: "Valor no válido de longitud",
    }),
  address: z
    .string({
      required_error: "Dirección es obligatorio",
      invalid_type_error: "Dirección debe ser texto",
    })
    .min(3, { message: "Dirección debe tener al menos 3 caracteres" })
    .max(128, { message: "Dirección puede tener como máximo 128 caracteres" }),
  phone_1: z
    .string({
      required_error: "El tel?fono es obligatorio",
      invalid_type_error: "Teléfono debe ser texto",
    })
    .min(8, { message: "Teléfono debe tener al menos 8 caracteres" })
    .max(16, { message: "Teléfono puede tener como máximo 16 caracteres" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Formato no válido numeru telefonu. Solo se permiten números y un signo + opcional al principio",
    }),
  phone_2: z
    .string({
      required_error: "El tel?fono es obligatorio",
      invalid_type_error: "Teléfono debe ser texto",
    })
    .min(8, { message: "Teléfono debe tener al menos 8 caracteres" })
    .max(16, { message: "Teléfono puede tener como máximo 16 caracteres" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Formato no válido numeru telefonu. Solo se permiten números y un signo + opcional al principio",
    }),
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
      invalid_type_error: "El correo electrónico debe ser texto",
    })
    .email({
      message: "Formato no válido adresu email",
    })
    .min(6, { message: "Email debe tener al menos 6 caracteres" })
    .max(64, { message: "Email puede tener como máximo 64 caracteres" }),
})

export const getClinicByIDSchema = z.object({
  id: z.string({
    required_error: "ID es obligatorio",
    invalid_type_error: "ID debe ser texto",
  }),
})

export const addClinicSchema = clinicSchema

export const checkIfClinicExistsSchema = z.object({
  id: clinicIDSchema,
})

export const updateClinicSchema = clinicSchema.extend({
  id: clinicIDSchema,
})

export type GetClinicInput = z.infer<typeof getClinicByIDSchema>

export type AddClinicInput = z.infer<typeof addClinicSchema>

export type CheckIfClinicExistsInput = z.infer<typeof checkIfClinicExistsSchema>

export type UpdateClinicInput = z.infer<typeof updateClinicSchema>
