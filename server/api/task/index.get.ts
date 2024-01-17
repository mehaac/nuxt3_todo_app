import { eq, sql } from 'drizzle-orm'
import z from 'zod'
import { db, schema } from '~/server/db'

const paginationSchema = z.object({
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(3),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const { limit, offset } = await getValidatedQuery(event, validate => paginationSchema.parse(validate))

  const task = await db.query.task.findMany({
    where: (task, { eq }) => eq(task.userId, user.userId),
    orderBy: (task, { desc }) => [desc(task.createdAt)],
    limit,
    offset,
  })
  const [{ count = 0 }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(schema.task)
    .where(eq(schema.task.userId, user.userId))

  const res = [
    task,
    {
      count,
    },
  ]

  return res
})
