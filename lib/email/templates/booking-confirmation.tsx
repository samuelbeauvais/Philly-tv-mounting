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
} from '@react-email/components'
import * as React from 'react'

interface BookingConfirmationEmailProps {
  name: string
  date: string
  timeSlot: string
  address: string
  city: string
  zipCode: string
  services?: string
  estimatedTotal?: string
  notes?: string
}

export const BookingConfirmationEmail = ({
  name,
  date,
  timeSlot,
  address,
  city,
  zipCode,
  services = '',
  estimatedTotal = '',
  notes = '',
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your TV Mounting Appointment is Confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmed!</Heading>
          <Text style={text}>
            Hi {name},
          </Text>
          <Text style={text}>
            Thank you for choosing Philly TV Mounting! Your appointment has been confirmed.
          </Text>

          <Section style={detailsSection}>
            <Heading as="h2" style={h2}>Appointment Details</Heading>
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
                <strong>Notes:</strong> {notes}
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            We'll arrive at your location on time and ready to work. If you need to reschedule
            or have any questions, please contact us.
          </Text>

          <Section style={contactSection}>
            <Heading as="h3" style={h3}>Contact Us</Heading>
            <Text style={detail}>
              Email: {process.env.BUSINESS_EMAIL || 'info@phillymounting.com'}
            </Text>
          </Section>

          <Text style={footer}>
            Thank you for your business!
            <br />
            Philly TV Mounting
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default BookingConfirmationEmail

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

const h3 = {
  color: '#333',
  fontSize: '18px',
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

const detailsSection = {
  backgroundColor: '#f8fafc',
  padding: '20px 40px',
  margin: '20px 0',
}

const contactSection = {
  padding: '0 40px',
  margin: '20px 0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
  marginTop: '32px',
}
