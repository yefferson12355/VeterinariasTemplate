import { type AdminNavItem, type NavItem } from "@/types"

const links = {
  facebook: "",
  github:
    "https://github.com/pjborowiecki/ARKA-Veterinary-Clinic-Page-and-Appointment-Booking-System.git",
  openGraphImage: "https://arka-weterynaria.pl/opengraph-image.png",
  manifestFile: "https://saasyland.com/site.webmanifest",
  authorsWebsite: "https://pjborowiecki.com",
}

export const siteConfig = {
  links,
  nameShort: "ARKA",
  nameLong: "Clínica veterinaria ARKA en Bochnia",
  description: "",
  url: "https://arka-weterynaria.pl",
  ogImage: links.openGraphImage,
  author: "Piotr Borowiecki",
  hostingRegion: "fra1",
  keywords: [
    "Clínica veterinaria",
    "Veterinario",
    "Veterinaria",
    "Veterinaria Bochnia",
    "Veterinaria Brzesko",
    "Veterinaria de Pequeña Polonia",
    "ARKA",
    "Piotr Surma",
  ],
  mainNavItems: [
    {
      title: "Clínica",
      href: "/#przychodnia",
    },
    {
      title: "Servicios",
      href: "/#uslugi",
    },
    {
      title: "Personal",
      href: "/#personel",
    },
    // {
    //   title: "Salon fryzur",
    //   href: "/#salon-fryzur",
    // },
    // {
    //   title: "Galeria",
    //   href: "/#galeria",
    // },
    {
      title: "Contacto",
      href: "/#kontakt",
    },
  ] satisfies NavItem[],

  mobileNav: [
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
