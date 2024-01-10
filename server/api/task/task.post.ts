import { db, schema } from '~/server/db'

import { taskFormSchema } from '~/server/utils'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const parsedBody = await readValidatedBody(event, (body) => {
    return taskFormSchema.parse(body)
  })

  try {
    const taskToCreate = await db.insert(schema.task).values({
      ...parsedBody,
      id: crypto.randomUUID(),
      userId: user.userId,
    }).returning()

    return taskToCreate
  }
  catch (e) {
    console.error(e)
  }
})
