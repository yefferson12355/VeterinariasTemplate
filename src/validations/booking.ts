import * as z from "zod"

import { bookings } from "@/db/schema"
import { hourSchema } from "@/validations/availability"

export const bookingIDSchema = z
  .string({
    required_error: "El ID de la reserva es obligatorio",
    invalid_type_error: "Los datos deben ser texto",
  })
  .min(1, {
    message: "El ID debe tener al menos 1 carácter",
  })
  .max(128, {
    message: "El ID puede tener como máximo 128 caracteres",
  })

export const bookingSchema = z.object({
  type: z
    .enum(bookings.type.enumValues, {
      required_error: "Selecciona el tipo de servicio",
      invalid_type_error: "Tipo de datos no válido",
    })
    .default(bookings.type.enumValues[0]),
  date: z.coerce.date({
    required_error: "Selecciona la fecha de la cita",
    invalid_type_error: "Tipo de datos no válido",
  }),
  time: hourSchema.unwrap(),
  firstName: z
    .string({
      required_error: "Este campo es obligatorio",
      invalid_type_error: "Tipo de datos no válido",
    })
    .max(32, {
      message: "Nombre debe tener como máximo 32 caracteres",
    }),
  lastName: z
    .string({
      required_error: "Este campo es obligatorio",
      invalid_type_error: "Tipo de datos no válido",
    })
    .max(32, {
      message: "Apellido debe tener como máximo 32 caracteres",
    }),
  email: z
    .string({
      required_error: "Este campo es obligatorio",
      invalid_type_error: "Tipo de datos no válido",
    })
    .email(),
  phone: z
    .string({
      required_error: "Este campo es obligatorio",
      invalid_type_error: "Tipo de datos no válido",
    })
    .min(9, {
      message: "Teléfono debe tener al menos 9 caracteres",
    })
    .max(20, {
      message: "Teléfono puede tener como máximo 20 caracteres",
    }),
  message: z.string().optional(),
  // rodo: z
  //   .boolean({
  //     required_error: "Zgoda na przetwarzanie danych jest wymagana",
  //     invalid_type_error: "Tipo de datos no válido",
  //   })
  //   .default(false)
  //   .refine((value) => value === true, {
  //     message: "Zgoda na przetwarzanie danych jest wymagana",
  //   }),
  status: z
    .enum(bookings.status.enumValues)
    .default(bookings.status.enumValues[0]),
})

export const addBookingSchema = bookingSchema

export const updateBookingSchema = bookingSchema.extend({
  id: bookingIDSchema,
})

export const deleteBookingSchema = z.object({
  id: bookingIDSchema,
})

export const checkIfBookingExistsSchema = z.object({
  id: bookingIDSchema,
})

export const filterBookingsSchema = z.object({
  query: z.string().optional(),
})

export type AddBookingInput = z.infer<typeof addBookingSchema>

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>

export type DeleteBookingInput = z.infer<typeof deleteBookingSchema>

export type CheckIfBookingExistsInput = z.infer<
  typeof checkIfBookingExistsSchema
>

export type FilterBookingsInput = z.infer<typeof filterBookingsSchema>
