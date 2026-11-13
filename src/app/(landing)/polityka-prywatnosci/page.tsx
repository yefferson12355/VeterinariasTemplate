import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Política de privacidad",
  description: "Política de privacidad y cláusula RODO",
}

export default function PrivacyPolicyPage(): JSX.Element {
  return <div>Política de privacidad y RODO</div>
}
