import { Server, Model, Response, hasMany } from 'miragejs'
import actors from './src/mirage-server/fixtures/actors'
import subjects from './src/mirage-server/fixtures/subjects'
import actorSubjectScopes  from './src/mirage-server/fixtures/actor-subject-scopes'
import { JwtToken, JwtUtils } from './src/mirage-server/models/jwt-model'
import { Actor } from './src/mirage-server/models/actor'
import { AuthService } from './src/mirage-server/auth-service'
import { Subject } from './src/mirage-server/models/subject'
import { RefreshToken } from './src/mirage-server/models/refresh-token'
import Cookies from 'js-cookie'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'
//import { createGraphQLHandler } from "@miragejs/graphql"

export function makeServer({ environment = 'development' } = {}) {
  const JWT_SECRET = '098765432345678987654'

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
        const body = JSON.parse(request.requestBody)
        const actorNationalId = body.actorNationalId
        const subjectNationalId = body.subjectNationalId
        const actor: Actor = authService.getActorByNationalId(actorNationalId)
        if (!actor) return new Response(401)
        const subject = authService.getSubjectByNationalId(subjectNationalId)
        const scopes = authService.getScopesForSession(actor, subject)

        const jwt = new JwtToken(actor, subject, scopes)
        const token = await jwt.signJwt(JWT_SECRET)

        const refreshToken = authService.createRefreshToken(actorNationalId)
        document.cookie = `refresh_token=${refreshToken.payload}; domain=localhost;  path=/; expires=${refreshToken.getExpiryUTCString()};`

        return new Response(200, {}, { token })
      })

      this.post('/user/refreshtoken', async (schema, request) => {
        const authService = new AuthService(server.db)
        const refreshToken = Cookies.get(MOCK_AUTH_KEY);
        if(!refreshToken){
          return new Response(401)
        }
        console.log('request for token '+ refreshToken)
        console.log(schema.db.dump())
        const refreshTokenEntity: RefreshToken = authService.getRefreshToken(refreshToken)

        if(!refreshTokenEntity) return new Response(401)
        console.log(refreshTokenEntity)
        const actor = authService.getActorByNationalId(refreshTokenEntity.nationalId)
        const subject = authService.getSubjectByNationalId(refreshTokenEntity.nationalId)
        const scopes = authService.getScopesForSession(actor, subject)
        const jwt = new JwtToken(actor, subject, scopes)

        const token = await jwt.signJwt(JWT_SECRET)

        return new Response(200, {}, {token})
      })

      this.get('/user/accounts', async (schema, request) => {
        const authService = new AuthService(server.db)
        const token = request.requestHeaders.authorization
        console.log(token)
        const isValid = await JwtUtils.isValidJwt(token, JWT_SECRET)

        if (!isValid) return new Response(401)

        const parsedToken: JwtToken = await JwtUtils.parseJwt(token)
        const subjects = authService.getSubjectListByNationalId(
          parsedToken.actor.nationalId,
        )
        console.log(subjects)
        return new Response(200, {}, { subjects })
      })

      this.get('/user/tokenexchange/:nationalId', async (schema, request) => {
        const authService = new AuthService(server.db)
        const token = request.requestHeaders.authorization
        const isValid = await JwtUtils.isValidJwt(token, JWT_SECRET)
        if (!isValid) return new Response(401)

        const parsedToken: JwtToken = await JwtUtils.parseJwt(token)
        const actor: Actor = authService.getActorByNationalId(
          parsedToken.actor.nationalId,
        )
        const subject: Subject = authService.getSubjectForActor(actor,  request.params.nationalId)

        if (!subject) {
          return new Response(401)
        }

        const scopes = authService.getScopesForSession(actor, subject)

        const jwt = new JwtToken(actor, subject, scopes)
        const newToken = await jwt.signJwt(JWT_SECRET)

        return new Response(200, {}, { newToken })
      })

      this.get('/documents', async (schema, request) => {
        server.timing = 1300
        const token = request.requestHeaders.authorization
        console.log('MIRAGE token ', token)
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
