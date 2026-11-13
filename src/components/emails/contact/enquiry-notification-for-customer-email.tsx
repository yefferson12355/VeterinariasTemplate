import { Body, Head, Html, Preview, Tailwind } from "@react-email/components"

interface EnquiryNotificationForCustomerEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export function EnquiryNotificationForCustomerEmail({
  firstName,
  lastName,
}: EnquiryNotificationForCustomerEmailProps): JSX.Element {
  const previewText = `${firstName} ${lastName} envía una consulta desde el formulario de contacto>`

  return (
    <Html lang="pl">
      <Head>
        <title>Hemos recibido tu consulta</title>
        <Preview>{previewText}</Preview>
      </Head>
      <Tailwind>
        <Body>
          {/* TODO */}
          Hemos recibido tu consulta y la clínica ARKA la revisará pronto
        </Body>
      </Tailwind>
    </Html>
  )
}
