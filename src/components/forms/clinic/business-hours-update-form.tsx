"use client"

import * as React from "react"
import { updateBusinessHours } from "@/actions/availability"

import { type BusinessHours } from "@/db/schema"
import {
  type UpdateBusinessHoursInput,
} from "@/validations/availability"
import { TIME_OPTIONS } from "@/data/constants"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"

const DAYS = [
  ["monday", "Lunes"],
  ["tuesday", "Martes"],
  ["wednesday", "Miércoles"],
  ["thursday", "Jueves"],
  ["friday", "Viernes"],
  ["saturday", "Sábado"],
  ["sunday", "Domingo"],
] as const

type Day = (typeof DAYS)[number][0]
type Period = { opening: string | null; closing: string | null }
type Periods = Record<Day, Period[]>

function isPeriod(value: object): value is Period {
  return (
    "opening" in value &&
    "closing" in value &&
    (typeof value.opening === "string" || value.opening === null) &&
    (typeof value.closing === "string" || value.closing === null)
  )
}

function getPeriods(value: object[] | undefined): Period[] {
  return value?.filter(isPeriod) ?? []
}

function getInitialPeriods(
  currentBusinessHours: BusinessHours | null
): Periods {
  return Object.fromEntries(
    DAYS.map(([day]) => [
      day,
      getPeriods(
        currentBusinessHours?.[
          `${day}Periods` as keyof BusinessHours
        ] as object[] | undefined
      ),
    ])
  ) as Periods
}

interface BusinessHoursUpdateFormProps {
  currentBusinessHours: BusinessHours | null
}

export function BusinessHoursUpdateForm({
  currentBusinessHours,
}: BusinessHoursUpdateFormProps): JSX.Element {
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()
  const [periods, setPeriods] = React.useState<Periods>(() =>
    getInitialPeriods(currentBusinessHours)
  )

  function updatePeriod(day: Day, field: keyof Period, value: string) {
    setPeriods((current) => ({
      ...current,
      [day]: [{ ...current[day][0], [field]: value || null }],
    }))
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!currentBusinessHours) return

    startTransition(async () => {
      try {
        const result = await updateBusinessHours({
          id: currentBusinessHours.id,
          ...periods,
        } as UpdateBusinessHoursInput)

        if (result === "success") {
          toast({ title: "Horario de atención fueron actualizados" })
        } else {
          toast({
            title: "Algo salió mal",
            description: "No se pudo actualizar el horario de atención",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: "Algo salió mal",
          description: "No se pudo actualizar el horario de atención",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <form className="grid w-full max-w-xl gap-4" onSubmit={onSubmit}>
      {DAYS.map(([day, label]) => {
        const period = periods[day][0]
        const isOpen = periods[day].length > 0

        return (
          <div
            key={day}
            className="grid grid-cols-4 items-end justify-center gap-4"
          >
            <h3 className="font-bold">{label}</h3>
            <label className="text-xs">
              <span className="mb-1 block text-primary/90">Estado</span>
              <select
                className="h-10 w-full rounded-md border bg-background px-2"
                value={isOpen ? "open" : "closed"}
                onChange={(event) =>
                  setPeriods((current) => ({
                    ...current,
                    [day]:
                      event.target.value === "open"
                        ? [{ opening: "08:00", closing: "17:00" }]
                        : [],
                  }))
                }
              >
                <option value="open">Abierto</option>
                <option value="closed">Cerrado</option>
              </select>
            </label>
            {isOpen ? (
              <>
                <label className="text-xs">
                  <span className="mb-1 block text-primary/90">Apertura</span>
                  <select
                    className="h-10 w-full rounded-md border bg-background px-2"
                    value={period?.opening ?? ""}
                    onChange={(event) =>
                      updatePeriod(day, "opening", event.target.value)
                    }
                  >
                    {TIME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs">
                  <span className="mb-1 block text-primary/90">Cierre</span>
                  <select
                    className="h-10 w-full rounded-md border bg-background px-2"
                    value={period?.closing ?? ""}
                    onChange={(event) =>
                      updatePeriod(day, "closing", event.target.value)
                    }
                  >
                    {TIME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            ) : null}
          </div>
        )
      })}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  )
}
