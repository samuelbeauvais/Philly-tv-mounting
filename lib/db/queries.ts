import { eq, desc } from 'drizzle-orm'
import { db } from './index'
import { bookings, messages, type Booking, type ContactMessage } from './schema'

// Booking functions
export async function createBooking(
  booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'updatedAt'>
): Promise<Booking> {
  const newBooking = {
    ...booking,
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending' as const,
  }

  const result = await db.insert(bookings).values(newBooking).returning()
  return result[0]
}

export async function getBookings(): Promise<Booking[]> {
  return db.select().from(bookings).orderBy(desc(bookings.createdAt))
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const result = await db.select().from(bookings).where(eq(bookings.id, id))
  return result[0] || null
}

export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<Booking | null> {
  const result = await db
    .update(bookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(bookings.id, id))
    .returning()

  return result[0] || null
}

// Contact message functions
export async function createContactMessage(
  message: Omit<ContactMessage, 'id' | 'createdAt' | 'status' | 'updatedAt'>
): Promise<ContactMessage> {
  const newMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'new' as const,
  }

  const result = await db.insert(messages).values(newMessage).returning()
  return result[0]
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return db.select().from(messages).orderBy(desc(messages.createdAt))
}

export async function updateMessageStatus(
  id: string,
  status: 'new' | 'read' | 'responded'
): Promise<ContactMessage | null> {
  const result = await db
    .update(messages)
    .set({ status, updatedAt: new Date() })
    .where(eq(messages.id, id))
    .returning()

  return result[0] || null
}
