export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()
  if (session)
    return sendRedirect(event, '/')

  const [url, state] = await githubAuth.getAuthorizationUrl()
  setCookie(event, 'github_oauth_state', state, {
    httpOnly: true,
    // eslint-disable-next-line node/prefer-global/process
    secure: !process.dev,
    path: '/',
    maxAge: 60 * 60,
  })
  return sendRedirect(event, url.toString())
})
