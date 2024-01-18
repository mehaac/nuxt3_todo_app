import { and, eq, ilike, sql } from 'drizzle-orm'
import z from 'zod'
import { db, schema } from '~/server/db'
import { TaskStatus } from '~/server/utils'

const paginationSchema = z.object({
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(3),
})

const searchSchema = paginationSchema.extend({
  search: z.string().optional(),
  priority: z.coerce.number().optional(),
  status: z.enum(TaskStatus).optional(),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const { limit, offset, search, priority, status } = await getValidatedQuery(event, validate => searchSchema.parse(validate))

  const isSearch = search && search.length > 0
  const isPriority = priority && priority > 0
  const isStatus = status && status.length > 0
  function queryBuilder() {
    return [
      isSearch ? ilike(schema.task.text, `%${search}%`) : undefined,
      isPriority ? eq(schema.task.priority, priority) : undefined,
      isStatus ? eq(schema.task.status, status) : undefined,
    ]
  }
  const query = queryBuilder()
  const task = await db.query.task.findMany({
    where: (task, { eq, and }) => and(
      eq(task.userId, user.userId),
      ...query,
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
    .where(and(
      eq(schema.task.userId, user.userId),
      ...query,
    ),
    )

  const res = [
    task,
    {
      count,
    },
  ]

  return res
})
