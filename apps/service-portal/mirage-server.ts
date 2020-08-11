import { Server, Model, Response, hasMany } from 'miragejs'
import actors from './src/mirage-server/fixtures/actors'
import subjects from './src/mirage-server/fixtures/subjects'
import actorSubjectScopes  from './src/mirage-server/fixtures/actor-subject-scopes'
import { JwtToken } from './src/mirage-server/models/jwt-model'
import { Actor } from './src/mirage-server/models/actor'
import { AuthService } from './src/mirage-server/auth-service'
import { Subject } from './src/mirage-server/models/subject'
import { RefreshToken } from './src/mirage-server/models/refresh-token'
import Cookies from 'js-cookie'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'
import { TokenFactory } from './src/mirage-server/token-factory'
import { Token } from 'graphql'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants'
//import { createGraphQLHandler } from "@miragejs/graphql"

export function makeServer({ environment = 'development' } = {}) {

  const server = new Server({
    models: {
      actor: Model.extend({
        subject: hasMany(),
      }),
      subject: Model,
      refreshTokens: Model,
    },
    fixtures: {
      actors: actors,
      subjects: subjects,
      actorSubjectScopes: actorSubjectScopes,
    },
    seeds(server) {
      server.loadFixtures('actors', 'subjects', 'actorSubjectScopes')
      console.log(server.db.dump())
    },
    routes() {
      this.post('/user/token', async (schema, request) => {
        const authService = new AuthService(server.db)
        const tokenFactory = new TokenFactory(authService)

        const body = JSON.parse(request.requestBody)
        const actorNationalId = body.actorNationalId
        const subjectNationalId = body.subjectNationalId
        const actor: Actor = authService.getActorByNationalId(actorNationalId)

        if (!actor) return new Response(401)

        const token = await tokenFactory.createSignedToken(actorNationalId, subjectNationalId)
        const refreshToken = authService.createRefreshToken(actorNationalId, subjectNationalId)

        //Should be httpOnly
        document.cookie = `refresh_token=${refreshToken.payload}; domain=localhost;  path=/; expires=${refreshToken.getExpiryUTCString()};`
        return new Response(200, {}, { token })
      })

      this.post('/user/refreshtoken', async (schema, request) => {
        const authService = new AuthService(server.db)
        const tokenFactory = new TokenFactory(authService)
        const refreshToken = Cookies.get(MOCK_AUTH_KEY);

        if(!refreshToken) return new Response(401)

        const refreshTokenEntity: RefreshToken = authService.getRefreshToken(refreshToken)


        if(!refreshTokenEntity || refreshTokenEntity.isExpired()) return new Response(401)

        const token = await tokenFactory.createSignedTokenFromRefreshToken(refreshTokenEntity)

        return new Response(200, {}, { token })
      })

      this.post('/user/tokenexchange/:nationalId', async (schema, request) => {
        const authService = new AuthService(server.db)
        const tokenFactory = new TokenFactory(authService)
        const refreshToken = Cookies.get(MOCK_AUTH_KEY);

        if(!refreshToken) return new Response(401)

        const refreshTokenEntity: RefreshToken = authService.getRefreshToken(refreshToken)

        if(!refreshTokenEntity || refreshTokenEntity.isExpired()) return new Response(401)

        //check if has access
        const token = await tokenFactory.createSignedToken(refreshTokenEntity.nationalId, request.params.nationalId)
        if(!token) return new Response(401)
        const newRefreshToken = authService.createRefreshToken(refreshTokenEntity.nationalId, request.params.nationalId)
        console.log('token', token)
        //Should be httpOnly
        document.cookie = `refresh_token=${newRefreshToken.payload}; domain=localhost;  path=/; expires=${newRefreshToken.getExpiryUTCString()};`

        return new Response(200, {}, { token })
      })

      this.get('/user/accounts', async (schema, request) => {
        const authService = new AuthService(server.db)
        const tokenFactory = new TokenFactory(authService)
        const token = request.requestHeaders.authorization
        const isValid = await tokenFactory.isValidJwt(token)

        if (!isValid) return new Response(401)

        const parsedToken: JwtToken = await tokenFactory.parseFromJwt(token)
        const subjects = authService.getSubjectListByNationalId(
          parsedToken.actor.nationalId,
        )

        return new Response(200, {}, { subjects })
      })

      this.get('/documents', async (schema, request) => {
        server.timing = 1300
        return new Response(200, {}, [
          {
            id: 1,
            name: 'Greiðsluseðill (Bifr.gjöld) - Ríkissjóðsinnheimtur',
          },
          { id: 2, name: 'Greiðsluseðill (Laun) - Ríkissjóðsinnheimtur' },
          { id: 3, name: 'Greiðsluseðill (Fasteignagjöld) - Ríkissjóðsinnheimtur' },
        ])
      })
    },
  })
}
