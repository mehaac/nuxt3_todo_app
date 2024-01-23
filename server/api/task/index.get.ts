import { and, eq, ilike, inArray, sql } from 'drizzle-orm'
import z from 'zod'
import { db, schema } from '~/server/db'
import { TaskStatus } from '~/server/utils'

function transformToArray(val: unknown) {
  return val
    ? Array.isArray(val)
      ? val
      : [val]
    : undefined
}

const paginationSchema = z.object({
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(3),
})

const searchSchema = paginationSchema.extend({
  search: z.string().optional(),
  priority: z.union([z.coerce.number(), z.array(z.coerce.number())]).optional().transform(transformToArray),
  status: z.union([z.enum(TaskStatus), z.array(z.enum(TaskStatus))]).optional().transform(transformToArray),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  const { limit, offset, search, priority, status }
    = await getValidatedQuery(event, (validate) => {
      return searchSchema.parse(validate)
    })

  const isSearch = search && search.length
  const isPriority = priority && priority.length
  const isStatus = status && status.length
  const queryBuilder = () => {
    return [
      isSearch ? ilike(schema.task.text, `%${search}%`) : undefined,
      isPriority ? inArray(schema.task.priority, priority) : undefined,
      isStatus ? inArray(schema.task.status, status) : undefined,
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
