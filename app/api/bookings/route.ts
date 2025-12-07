import { NextRequest, NextResponse } from 'next/server'
import { createBooking, getBookings } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'zipCode', 'date', 'timeSlot']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const booking = await createBooking({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      zipCode: body.zipCode,
      date: body.date,
      timeSlot: body.timeSlot,
      services: body.services || '',
      estimatedTotal: body.estimatedTotal || '',
      notes: body.notes || '',
    })

    // Here you could add email notification logic
    // await sendBookingConfirmationEmail(booking)

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await getBookings()
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
