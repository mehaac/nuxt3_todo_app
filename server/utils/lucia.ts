import { lucia } from 'lucia'
import { h3 } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import { github } from '@lucia-auth/oauth/providers'
import { client } from '~/server/db/'
import 'lucia/polyfill/node'

const runtimeConfig = useRuntimeConfig()
// expect error (see next section)
export const auth = lucia({
  env: runtimeConfig.dev ? 'DEV' : 'PROD',
  adapter: postgresAdapter(client, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  middleware: h3(),
  getUserAttributes: (data) => {
    return {
      githubUsername: data.username,
    }
  },
})

export const githubAuth = github(auth, {
  clientId: runtimeConfig.githubClientId,
  clientSecret: runtimeConfig.githubClientSecret,
})

export type Auth = typeof auth
