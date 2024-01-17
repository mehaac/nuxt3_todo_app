import { eq } from 'drizzle-orm'
import { db, schema } from '~/server/db'
import { taskParamSchema, updateTaskSchema } from '~/server/utils'

export default defineEventHandler (async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  const params = await getValidatedRouterParams(event, (param) => {
    return taskParamSchema.parse(param)
  })
  const body = await readValidatedBody(event, body => updateTaskSchema.parse(body))
  const updatedTask = await db.update(schema.task).set({
    ...body,
  }).where(eq(schema.task.id, params.id)).returning()
  await new Promise((resolve) => { setTimeout(() => resolve(true), 2000) })
  return updatedTask
})
