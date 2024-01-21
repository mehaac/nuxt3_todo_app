import { and, eq, inArray } from 'drizzle-orm'
import z from 'zod'
import { db, schema } from '~/server/db'

const schemaX = z.object({
  payload: z.array(z.string()),
})

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const params = await readValidatedBody(event, (body) => {
    return schemaX.parse(body)
  })

  try {
    await db.delete(schema.task)
      .where(and(eq(schema.task.userId, user.userId), inArray(schema.task.id, params.payload)))
    return true
  }
  catch (error) {
    if (error instanceof Error)
      throw createError({ statusCode: 500, message: error.message })

    throw error
  }
})
