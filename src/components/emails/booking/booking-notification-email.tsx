import { Body, Container, Head, Html, Preview, Text } from "@react-email/components"

interface BookingNotificationEmailProps {
  type: string
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export function BookingNotificationEmail({
  type,
  date,
  time,
  firstName,
  lastName,
  email,
  phone,
  message,
}: BookingNotificationEmailProps): JSX.Element {
  const previewText = `Nueva reserva de ${firstName} ${lastName}`

  return (
    <Html lang="es">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body>
        <Container>
          <Text>Se ha recibido una nueva reserva.</Text>
          <Text>
            <strong>Servicio:</strong> {type}
            <br />
            <strong>Fecha:</strong> {date}
            <br />
            <strong>Hora:</strong> {time}
          </Text>
          <Text>
            <strong>Cliente:</strong> {firstName} {lastName}
            <br />
            <strong>Email:</strong> {email}
            <br />
            <strong>Teléfono:</strong> {phone}
          </Text>
          {message && (
            <Text>
              <strong>Mensaje:</strong> {message}
            </Text>
          )}
        </Container>
      </Body>
    </Html>
  )
}
