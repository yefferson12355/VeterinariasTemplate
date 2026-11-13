import { type AdminNavItem } from "@/types"

export interface AdminConfigProps {
  sidebarNav: AdminNavItem[]
}

export const adminConfig: AdminConfigProps = {
  sidebarNav: [
    {
      title: "Clínica",
      href: "/admin/przychodnia",
    },
    {
      title: "Reservas",
      href: "/admin/rezerwacje",
    },
    {
      title: "Disponibilidad",
      href: "/admin/dostepnosc",
    },
    {
      title: "Perfil",
      href: "/admin/profil",
    },
  ] satisfies AdminNavItem[],
}
