import type { Config } from 'drizzle-kit'

export default {
  schema: './server/db/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    // eslint-disable-next-line node/prefer-global/process
    connectionString: process.env.NUXT_SUPABASE_DATABASE_URL ?? '',
  },
} satisfies Config
