import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const { supabase } = useRuntimeConfig()

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(supabase.databaseUrl, { prepare: false })
export const db = drizzle(client, { schema })
