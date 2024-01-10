import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const task = await db.query.task.findMany({
    where: (task, { eq }) => eq(task.userId, user.userId),
  })

  return task
})
