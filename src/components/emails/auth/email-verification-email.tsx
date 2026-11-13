import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `Weryfikacja maila na stronie ${siteConfig.nameShort}`
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Heja,</Text>
              <Text className="text-base">
                Alguien intentó usar la dirección {email} para crear
                konta administratora na stronie{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.nameShort}
                </span>
                .
              </Text>
              <Text className="text-base">
                Si fuiste tú, haz clic en el siguiente enlace para confirmar tu
                correo electrónico y completar el registro de tu cuenta.
              </Text>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/rejestracja/potwierdz-email?token=${emailVerificationToken}`}
              >
                Confirmar correo electrónico
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                Si no intentaste registrarte, ignora este mensaje
                maila.
              </Text>
              <Text className="text-base font-medium">¡Que tengas un buen día!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
