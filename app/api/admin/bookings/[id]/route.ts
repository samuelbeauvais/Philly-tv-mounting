import { NextRequest, NextResponse } from 'next/server'
import { getBookingById, updateBookingStatus } from '@/lib/db/queries'
import type { Booking } from '@/lib/db/schema'
import { sendBookingStatusUpdate } from '@/lib/email'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Get the old booking to know the previous status
    const oldBooking = await getBookingById(id)
    if (!oldBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    const oldStatus = oldBooking.status

    // Update the booking status
    const updatedBooking = await updateBookingStatus(id, status)

    if (!updatedBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Send status update email to customer (for confirmed/cancelled only)
    await sendBookingStatusUpdate(updatedBooking, oldStatus)

    return NextResponse.json({ success: true, booking: updatedBooking })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}
