import { db, schema } from '~/server/db'

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()
  const user = session?.user
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
    return createdProfile[0]
  }
  return profile
})
