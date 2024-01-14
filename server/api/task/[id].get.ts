import { db } from '~/server/db'
import { taskParamSchema } from '~/server/utils'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const params = await getValidatedRouterParams(event, param => taskParamSchema.parse(param))
  const task = await db.query.task.findFirst({
    where: (task, { eq, and }) => and(eq(task.userId, user.userId), eq(task.id, params.id)),
  })

  return task
})
