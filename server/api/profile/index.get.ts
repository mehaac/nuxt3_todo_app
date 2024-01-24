import { db, schema } from '~/server/db'
import type { TaskDto } from '~/server/utils'

const defaultTasks: Pick<TaskDto, 'priority' | 'status' | 'text'>[] = [
  {
    priority: 1,
    status: 'done',
    text: 'Click Create Task and fill out the form',
  },
  {
    priority: 2,
    status: 'todo',
    text: 'Use the header input to search for existing tasks',
  },
  {
    priority: 5,
    status: 'todo',
    text: 'Select a task to delete from the list',
  },
  {
    priority: 3,
    status: 'todo',
    text: 'Click on the text of a task to edit its details',
  },
]

function createDefaultTasks(userId: string) {
  const arr: TaskDto[] = []

  for (let i = 0; i < defaultTasks.length; i++) {
    const time = new Date(Date.now() + (i * 100_000)).toISOString()
    arr[i] = {
      ...defaultTasks[i],
      id: crypto.randomUUID(),
      userId,
      createdAt: time,
      updatedAt: time,
    }
  }

  return arr
}

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const profile = await db.query.userProfile.findFirst({
    where: (userX, { eq }) => eq(userX.userId, user.userId),
  })
  if (!profile) {
    const createdProfile = await db.insert(schema.userProfile).values({
      id: crypto.randomUUID().toString(),
      role: 'user',
      userId: user.userId,
    }).returning()
    await db.insert(schema.task).values(createDefaultTasks(user.userId))
    return createdProfile[0]
  }
  return profile
})
