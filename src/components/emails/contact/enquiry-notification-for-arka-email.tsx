import { Body, Head, Html, Preview, Tailwind } from "@react-email/components"

interface EnquiryNotificationForArkaEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export function EnquiryNotificationForArkaEmail({
  firstName,
  lastName,
}: EnquiryNotificationForArkaEmailProps): JSX.Element {
  const previewText = `${firstName} ${lastName} envía una consulta desde el formulario de contacto>`

  return (
    <Html lang="pl">
      <Head>
        <title>Nueva consulta del formulario de contacto</title>
        <Preview>{previewText}</Preview>
      </Head>
      <Tailwind>
        <Body>
          {/* TODO */}
          Nueva consulta recibida desde el formulario de contacto de ARKA
        </Body>
      </Tailwind>
    </Html>
  )
}
