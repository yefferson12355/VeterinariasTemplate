import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getBusinessHours } from "@/actions/availability"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BusinessHoursUpdateForm } from "@/components/forms/clinic/business-hours-update-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Disponibilidad",
  description: "Define los días y horarios de atención",
}

export default async function AvailabilityPage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  const currentBusinessHours = await getBusinessHours()

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Disponibilidad</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administración de disponibilidad
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* Opening hours */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Horario de atención</CardTitle>
            <CardDescription>
              Horarios en los que atiendes a clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessHoursUpdateForm
              currentBusinessHours={currentBusinessHours}
            />
          </CardContent>
        </Card>

        {/* Days unavailable */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Días no disponibles</CardTitle>
            <CardDescription>
              Días en los que no atenderás a clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            Aquí podrás añadir días en los que la clínica permanecerá cerrada.
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
