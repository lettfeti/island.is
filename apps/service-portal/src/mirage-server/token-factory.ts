import { AuthService } from './auth-service';
import { JwtToken } from './models/jwt-model';
import { RefreshToken } from './models/refresh-token';
//@ts-ignore
import * as jwt from 'webcrypto-jwt'

export class TokenFactory {

  readonly JWT_SECRET = '098765432345678987654'

  constructor(private authService: AuthService) {}

  public async createSignedTokenFromRefreshToken(refreshToken: RefreshToken): Promise<string> {

    const actor = this.authService.getActorByNationalId(refreshToken.nationalId)
    const subject = this.authService.getSubjectByNationalId(refreshToken.subjectNationalId)
    const scopes = this.authService.getScopesForSession(actor, subject)
    const jwt = new JwtToken(actor, subject, scopes)

    return await jwt.signJwt(this.JWT_SECRET)
  }

  public async createSignedToken(nationalId: string, subjectNationalId: string): Promise<string> {
    const actor = this.authService.getActorByNationalId(nationalId)
    const subject = this.authService.getSubjectByNationalId(subjectNationalId)
    if(!subject) return null
    const scopes = this.authService.getScopesForSession(actor, subject)
    const jwt = new JwtToken(actor, subject, scopes)

    return await jwt.signJwt(this.JWT_SECRET)
  }

  public async isValidJwt(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      jwt.verifyJWT(token, this.JWT_SECRET, 'HS256', function(
        err: any,
        isValid: boolean | PromiseLike<boolean>,
      ) {
        if (err) reject(err)
        resolve(isValid)
      })
    })
  }

  public async parseFromJwt(token: string): Promise<JwtToken> {
    return await jwt.parseJWT(token)
  }
}
