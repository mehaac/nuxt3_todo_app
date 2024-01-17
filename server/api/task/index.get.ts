import { and, eq, ilike, sql } from 'drizzle-orm'
import z from 'zod'
import { db, schema } from '~/server/db'

const paginationSchema = z.object({
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(3),
})

const searchSchema = paginationSchema.extend({
  search: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const { limit, offset, search } = await getValidatedQuery(event, validate => searchSchema.parse(validate))
  const isSearch = search && search.length > 0

  const task = await db.query.task.findMany({
    where: (task, { eq, and, ilike }) => and(
      eq(task.userId, user.userId),
      isSearch ? ilike(task.text, `%${search}%`) : undefined,
    ),
    orderBy: (task, { desc }) => [desc(task.createdAt)],
    limit,
    offset,
  })
  const [{ count = 0 }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(schema.task)
    .where(and(eq(schema.task.userId, user.userId), isSearch ? ilike(schema.task.text, `%${search}%`) : undefined))

  const res = [
    task,
    {
      count,
    },
  ]

  return res
})
