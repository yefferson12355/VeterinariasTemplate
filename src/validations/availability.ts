import * as z from "zod"

export const hourSchema = z
  .string({
    required_error: "Introduce la hora de apertura",
    invalid_type_error: "Tipo de datos no válido",
  })
  .length(5)
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Formato de hora no válido. El formato correcto es HH:MM",
  })
  .nullable()

export const businessHoursIDSchema = z
  .string({
    required_error: "ID es obligatorio",
    invalid_type_error: "Los datos deben ser texto",
  })
  .min(1, {
    message: "ID debe tener al menos 1 znak",
  })
  .max(128, {
    message: "ID puede tener como máximo 32 caracteres",
  })

export const singlePeriodSchema = z.object({
  opening: hourSchema,
  closing: hourSchema,
})

export const dayPeriodsSchema = z.array(singlePeriodSchema).default([])

export const businessHoursSchema = z.object({
  mondayPeriods: dayPeriodsSchema,
  tuesdayPeriods: dayPeriodsSchema,
  wednesdayPeriods: dayPeriodsSchema,
  thursdayPeriods: dayPeriodsSchema,
  fridayPeriods: dayPeriodsSchema,
  saturdayPeriods: dayPeriodsSchema,
  sundayPeriods: dayPeriodsSchema,
})

export const addBusinessHoursSchema = businessHoursSchema

export const updateBusinessHoursSchema = businessHoursSchema.extend({
  id: businessHoursIDSchema,
})

export type AddBusinessHoursInput = z.infer<typeof addBusinessHoursSchema>

export type UpdateBusinessHoursInput = z.infer<typeof updateBusinessHoursSchema>
