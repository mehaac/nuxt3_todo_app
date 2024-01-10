export default defineEventHandler(async (event) => {
  const user = await getAuthUser(event)
  event.context.user = user
})
