import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface ContactNotificationEmailProps {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: Date | string
}

export const ContactNotificationEmail = ({
  id,
  name,
  email,
  phone = '',
  subject,
  message,
  createdAt,
}: ContactNotificationEmailProps) => {
  const dashboardUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard/messages`
    : 'https://your-domain.com/admin/dashboard/messages'

  return (
    <Html>
      <Head />
      <Preview>New Contact Message: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Message</Heading>

          <Section style={alertSection}>
            <Text style={alertText}>
              {name} sent you a message
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Heading as="h2" style={h2}>Contact Information</Heading>
            <Text style={detail}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={detail}>
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text style={detail}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            <Text style={detail}>
              <strong>Message ID:</strong> {id}
            </Text>
            <Text style={detail}>
              <strong>Submitted:</strong> {new Date(createdAt).toLocaleString()}
            </Text>
          </Section>

          <Section style={messageSection}>
            <Heading as="h2" style={h2}>Subject</Heading>
            <Text style={subjectText}>{subject}</Text>

            <Heading as="h2" style={h2}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <Link href={`mailto:${email}`} style={link}>
              Reply to {name} →
            </Link>
          </Text>

          <Text style={text}>
            <Link href={dashboardUrl} style={link}>
              View in Admin Dashboard →
            </Link>
          </Text>

          <Text style={footer}>
            This is an automated notification from Philly TV Mounting
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactNotificationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
}

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 40px',
}

const detail = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '8px 0',
}

const alertSection = {
  backgroundColor: '#e0f2fe',
  padding: '20px 40px',
  margin: '20px 0',
  borderLeft: '4px solid #0284c7',
}

const alertText = {
  color: '#075985',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const detailsSection = {
  backgroundColor: '#f8fafc',
  padding: '20px 40px',
  margin: '20px 0',
}

const messageSection = {
  padding: '0 40px',
  margin: '20px 0',
}

const subjectText = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  lineHeight: '24px',
  margin: '8px 0 16px',
}

const messageText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '8px 0',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '4px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const link = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: 'bold',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
  marginTop: '32px',
}
