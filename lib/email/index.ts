import { Resend } from 'resend'
import { render } from '@react-email/render'
import BookingConfirmationEmail from './templates/booking-confirmation'
import BookingAdminNotificationEmail from './templates/booking-admin-notification'
import ContactNotificationEmail from './templates/contact-notification'
import type { Booking, ContactMessage } from '../db/schema'

// Lazy initialize Resend to avoid build-time errors
let resendClient: Resend | null = null
function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set - emails will not be sent')
      return null
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@phillymounting.com'
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'info@phillymounting.com'

export async function sendBookingConfirmation(booking: Booking): Promise<void> {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Skipping booking confirmation email - Resend not configured')
      return
    }

    const html = await render(
      BookingConfirmationEmail({
        name: booking.name,
        date: booking.date,
        timeSlot: booking.timeSlot,
        address: booking.address,
        city: booking.city,
        zipCode: booking.zipCode,
        services: booking.services || '',
        estimatedTotal: booking.estimatedTotal || '',
        notes: booking.notes,
      })
    )

    await resend.emails.send({
      from: `Philly TV Mounting <${BUSINESS_EMAIL}>`,
      to: booking.email,
      subject: 'Your TV Mounting Appointment is Confirmed',
      html,
    })

    console.log(`Booking confirmation email sent to ${booking.email}`)
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error)
    // Don't throw - we don't want email failures to break the booking process
  }
}

export async function sendBookingNotificationToAdmin(booking: Booking): Promise<void> {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Skipping admin notification email - Resend not configured')
      return
    }

    const html = await render(
      BookingAdminNotificationEmail({
        id: booking.id,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        date: booking.date,
        timeSlot: booking.timeSlot,
        address: booking.address,
        city: booking.city,
        zipCode: booking.zipCode,
        services: booking.services || '',
        estimatedTotal: booking.estimatedTotal || '',
        notes: booking.notes,
        createdAt: booking.createdAt,
      })
    )

    await resend.emails.send({
      from: `Philly TV Mounting <${BUSINESS_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Booking from ${booking.name} - ${booking.date}`,
      html,
    })

    console.log(`Admin notification email sent to ${ADMIN_EMAIL}`)
  } catch (error) {
    console.error('Failed to send admin notification email:', error)
    // Don't throw - we don't want email failures to break the booking process
  }
}

export async function sendContactNotification(message: ContactMessage): Promise<void> {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Skipping contact notification email - Resend not configured')
      return
    }

    const html = await render(
      ContactNotificationEmail({
        id: message.id,
        name: message.name,
        email: message.email,
        phone: message.phone || '',
        subject: message.subject,
        message: message.message,
        createdAt: message.createdAt,
      })
    )

    await resend.emails.send({
      from: `Philly TV Mounting <${BUSINESS_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Contact Message: ${message.subject}`,
      html,
    })

    console.log(`Contact notification email sent to ${ADMIN_EMAIL}`)
  } catch (error) {
    console.error('Failed to send contact notification email:', error)
    // Don't throw - we don't want email failures to break the contact form
  }
}

export async function sendBookingStatusUpdate(
  booking: Booking,
  oldStatus: string
): Promise<void> {
  // Only send email for confirmed or cancelled status
  if (booking.status !== 'confirmed' && booking.status !== 'cancelled') {
    return
  }

  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Skipping status update email - Resend not configured')
      return
    }

    const statusText = booking.status === 'confirmed' ? 'confirmed' : 'cancelled'
    const subject = `Your Appointment has been ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`

    await resend.emails.send({
      from: `Philly TV Mounting <${BUSINESS_EMAIL}>`,
      to: booking.email,
      subject,
      html: `
        <h2>Appointment ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}</h2>
        <p>Hi ${booking.name},</p>
        <p>Your appointment scheduled for ${booking.date} at ${booking.timeSlot} has been ${statusText}.</p>
        ${booking.status === 'cancelled' ? '<p>If you would like to reschedule, please contact us.</p>' : '<p>We look forward to serving you!</p>'}
        <p>Thank you,<br>Philly TV Mounting</p>
      `,
    })

    console.log(`Status update email sent to ${booking.email}`)
  } catch (error) {
    console.error('Failed to send status update email:', error)
    // Don't throw - we don't want email failures to break the status update
  }
}
