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

interface BookingAdminNotificationEmailProps {
  id: string
  name: string
  email: string
  phone: string
  date: string
  timeSlot: string
  address: string
  city: string
  zipCode: string
  services?: string
  estimatedTotal?: string
  notes?: string
  createdAt: Date | string
}

export const BookingAdminNotificationEmail = ({
  id,
  name,
  email,
  phone,
  date,
  timeSlot,
  address,
  city,
  zipCode,
  services = '',
  estimatedTotal = '',
  notes = '',
  createdAt,
}: BookingAdminNotificationEmailProps) => {
  const dashboardUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard`
    : 'https://your-domain.com/admin/dashboard'

  return (
    <Html>
      <Head />
      <Preview>New Booking from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Booking Received</Heading>

          <Section style={alertSection}>
            <Text style={alertText}>
              You have a new booking appointment scheduled for {date} at {timeSlot}
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Heading as="h2" style={h2}>Customer Information</Heading>
            <Text style={detail}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={detail}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={detail}>
              <strong>Phone:</strong> {phone}
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Heading as="h2" style={h2}>Appointment Details</Heading>
            <Text style={detail}>
              <strong>Booking ID:</strong> {id}
            </Text>
            <Text style={detail}>
              <strong>Date:</strong> {date}
            </Text>
            <Text style={detail}>
              <strong>Time:</strong> {timeSlot}
            </Text>
            <Text style={detail}>
              <strong>Location:</strong> {address}, {city}, {zipCode}
            </Text>
            {services && (
              <Text style={detail}>
                <strong>Services:</strong> {services}
              </Text>
            )}
            {estimatedTotal && (
              <Text style={detail}>
                <strong>Estimated Total:</strong> {estimatedTotal}
              </Text>
            )}
            {notes && (
              <Text style={detail}>
                <strong>Customer Notes:</strong> {notes}
              </Text>
            )}
            <Text style={detail}>
              <strong>Submitted:</strong> {new Date(createdAt).toLocaleString()}
            </Text>
          </Section>

          <Hr style={hr} />

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

export default BookingAdminNotificationEmail

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
  backgroundColor: '#fff3cd',
  padding: '20px 40px',
  margin: '20px 0',
  borderLeft: '4px solid #ffc107',
}

const alertText = {
  color: '#856404',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const detailsSection = {
  backgroundColor: '#f8fafc',
  padding: '20px 40px',
  margin: '20px 0',
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
