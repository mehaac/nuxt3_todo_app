import { and, eq } from 'drizzle-orm'
import { db, schema } from '~/server/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const params = await getValidatedRouterParams(event, (param) => {
    return taskParamSchema.parse(param)
  })
  try {
    await db.delete(schema.task)
      .where(and(eq(schema.task.userId, user.userId), eq(schema.task.id, params.id)))
    return true
  }
  catch (error) {
    if (error instanceof Error)
      throw createError({ statusCode: 500, message: error.message })

    throw error
  }
})
