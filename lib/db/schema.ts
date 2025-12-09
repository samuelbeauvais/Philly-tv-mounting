import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  zipCode: text('zip_code').notNull(),
  date: text('date').notNull(),
  timeSlot: text('time_slot').notNull(),
  services: text('services').default(''),
  estimatedTotal: text('estimated_total').default(''),
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  status: text('status').notNull().default('pending'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const messages = pgTable('messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').default(''),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  status: text('status').notNull().default('new'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// TypeScript types inferred from schema
export type Booking = typeof bookings.$inferSelect
export type NewBooking = typeof bookings.$inferInsert
export type ContactMessage = typeof messages.$inferSelect
export type NewContactMessage = typeof messages.$inferInsert
