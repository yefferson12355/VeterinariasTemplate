import { cache } from "react"
import type { Session } from "next-auth"

import { auth } from "@/auth"

const developmentSession: Session = {
  user: {
    id: "development-admin",
    name: "Administrador local",
    email: "local@arka.test",
    image: null,
    role: "administrador",
  },
  expires: "9999-12-31T23:59:59.999Z",
}

export default cache(async (): Promise<Session | null> => {
  const session = await auth()
  if (session || process.env.NODE_ENV !== "development") return session

  return developmentSession
})
