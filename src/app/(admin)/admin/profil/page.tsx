import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import { UserUpdateForm } from "@/components/forms/auth/user-update-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Perfil",
  description: "Administrar los datos del administrador",
}

export default async function ProfilePage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Perfil</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administración de los datos del administrador
        </PageHeaderDescription>
      </PageHeader>
      <div className="w-full overflow-hidden">
        <UserUpdateForm />
      </div>
    </Shell>
  )
}
