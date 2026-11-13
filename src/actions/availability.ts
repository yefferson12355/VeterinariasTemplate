"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { db } from "@/config/db"
import {
  psGetBusinessHours,
  psGetDatesUnavailable,
} from "@/db/prepared-statements/clinic"
import {
  businessHours,
  type BusinessHours,
  type DateUnavailable,
} from "@/db/schema"
import {
  businessHoursSchema,
  updateBusinessHoursSchema,
  type AddBusinessHoursInput,
  type UpdateBusinessHoursInput,
} from "@/validations/availability"

import { generateId } from "@/lib/utils"

export async function addBusinessHours(
  rawInput: AddBusinessHoursInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = businessHoursSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const newBusinessHours = await db
      .insert(businessHours)
      .values({
        id: generateId(),
        mondayPeriods: validatedInput.data.mondayPeriods,
        tuesdayPeriods: validatedInput.data.tuesdayPeriods,
        wednesdayPeriods: validatedInput.data.wednesdayPeriods,
        thursdayPeriods: validatedInput.data.thursdayPeriods,
        fridayPeriods: validatedInput.data.fridayPeriods,
        saturdayPeriods: validatedInput.data.saturdayPeriods,
        sundayPeriods: validatedInput.data.sundayPeriods,
      })
      .returning()

    revalidatePath("/admin/przychodnia/godziny")
    revalidatePath("/")

    return newBusinessHours ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error al agregar el horario de atención")
  }
}

export async function getBusinessHours(): Promise<BusinessHours | null> {
  try {
    noStore()
    let [businessHours] = await psGetBusinessHours.execute()

    if (!businessHours) {
      const newBusinessHours = await addBusinessHours({
        mondayPeriods: [{ opening: "08:00", closing: "17:00" }],
        tuesdayPeriods: [{ opening: "08:00", closing: "17:00" }],
        wednesdayPeriods: [{ opening: "08:00", closing: "17:00" }],
        thursdayPeriods: [{ opening: "08:00", closing: "17:00" }],
        fridayPeriods: [{ opening: "08:00", closing: "17:00" }],
        saturdayPeriods: [{ opening: "08:00", closing: "13:00" }],
        sundayPeriods: [],
      })

      if (newBusinessHours) {
        ;[businessHours] = await psGetBusinessHours.execute()
      }
    }

    return businessHours || null
  } catch (error) {
    console.error(error)
    throw new Error("Error al cargar el horario de atención")
  }
}

export async function updateBusinessHours(
  rawInput: UpdateBusinessHoursInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = updateBusinessHoursSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const businessHoursUpdated = await db
      .update(businessHours)
      .set({
        mondayPeriods: validatedInput.data.mondayPeriods,
        tuesdayPeriods: validatedInput.data.tuesdayPeriods,
        wednesdayPeriods: validatedInput.data.wednesdayPeriods,
        thursdayPeriods: validatedInput.data.thursdayPeriods,
        fridayPeriods: validatedInput.data.fridayPeriods,
        saturdayPeriods: validatedInput.data.saturdayPeriods,
        sundayPeriods: validatedInput.data.sundayPeriods,
      })
      .where(eq(businessHours.id, validatedInput.data.id))
      .returning()

    revalidatePath("/admin/przychodnia/godziny")

    return businessHoursUpdated ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error al actualizar el horario de atención")
  }
}

export async function getDatesUnavailable(): Promise<DateUnavailable[] | null> {
  try {
    noStore()
    const datesUnavailable = await psGetDatesUnavailable.execute()
    return datesUnavailable ?? null
  } catch (error) {
    console.error()
    throw new Error("Error al cargar las fechas no disponibles")
  }
}

export async function getDatesUnavailableAsAnArrayOfDates(): Promise<Date[]> {
  try {
    const datesUnavailableObjects = await psGetDatesUnavailable.execute()
    if (!datesUnavailableObjects) return []

    const datesUnavailable = datesUnavailableObjects.map(
      (dateUnavailable) => new Date(dateUnavailable.date)
    )

    return datesUnavailable ?? []
  } catch (error) {
    console.error()
    throw new Error("Error al cargar las fechas no disponibles")
  }
}

// TODO
export async function addDateUnavailable() {}

// TODO
export async function updateDateUnavailable() {}

// TODO
export async function deleteDateUnavailable() {}
