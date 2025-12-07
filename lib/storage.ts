import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'lib/data')

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  date: string
  timeSlot: string
  services?: string
  estimatedTotal?: string
  notes: string
  createdAt: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: string
  status: 'new' | 'read' | 'responded'
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function readJSON<T>(filename: string): Promise<T[]> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeJSON<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

// Booking functions
export async function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
  const bookings = await readJSON<Booking>('bookings.json')
  const newBooking: Booking = {
    ...booking,
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  }
  bookings.push(newBooking)
  await writeJSON('bookings.json', bookings)
  return newBooking
}

export async function getBookings(): Promise<Booking[]> {
  return readJSON<Booking>('bookings.json')
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings()
  return bookings.find(b => b.id === id) || null
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
  const bookings = await getBookings()
  const index = bookings.findIndex(b => b.id === id)
  if (index === -1) return null

  bookings[index].status = status
  await writeJSON('bookings.json', bookings)
  return bookings[index]
}

// Contact message functions
export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
  const messages = await readJSON<ContactMessage>('messages.json')
  const newMessage: ContactMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  }
  messages.push(newMessage)
  await writeJSON('messages.json', messages)
  return newMessage
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return readJSON<ContactMessage>('messages.json')
}

export async function updateMessageStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null> {
  const messages = await getContactMessages()
  const index = messages.findIndex(m => m.id === id)
  if (index === -1) return null

  messages[index].status = status
  await writeJSON('messages.json', messages)
  return messages[index]
}
