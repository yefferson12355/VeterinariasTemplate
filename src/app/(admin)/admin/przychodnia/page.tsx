import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getClinic } from "@/actions/clinic"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import { ClinicUpdateForm } from "@/components/forms/clinic/clinic-update-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Clínica",
  description: "Administrar los datos de la clínica",
}

export default async function ClinicPage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  const clinic = await getClinic()
  if (!clinic) throw new Error("No se pudieron cargar los datos de la clínica")

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Clínica</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administración de los datos de la clínica
        </PageHeaderDescription>
      </PageHeader>
      <div className="w-full overflow-hidden">
        <ClinicUpdateForm clinic={clinic} />
      </div>
    </Shell>
  )
}
