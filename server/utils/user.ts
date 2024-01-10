import type { H3Event } from 'h3'

export async function getAuthUser(event: H3Event) {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()
  return session?.user
}
