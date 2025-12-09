import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql as vercelSql } from '@vercel/postgres'
import * as schema from './schema'

// Create Drizzle instance with Vercel Postgres
export const db = drizzle(vercelSql, { schema })

// Export SQL helper for raw queries if needed
export { sql } from 'drizzle-orm'
