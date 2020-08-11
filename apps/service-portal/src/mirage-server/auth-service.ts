import { Actor } from './models/actor'
import Db from 'miragejs/db'
import { Subject, SubjectListDto } from './models/subject'
import { RefreshToken } from './models/refresh-token'

export class AuthService {
  private db: Db
  constructor(miragedb: Db) {
    this.db = miragedb
  }

  public getActorByNationalId(nId: string): Actor {
    return this.db.actors.findBy(
      (x: { nationalId: string }) => x.nationalId === nId,
    )
  }

  public getSubjectByNationalId(nId: string): Subject {
    return this.db.subjects.findBy(
      (x: { nationalId: string }) => x.nationalId === nId,
    )
  }

  public getSubjectListByNationalId(nId: string): SubjectListDto[] {
    const actorEntity = this.getActorByNationalId(nId)

    return actorEntity.subjectIds.map((x: number) => {
      const subject = this.db.subjects.find(x) as Subject
      const subjectListItem: SubjectListDto = {
        nationalId: subject.nationalId,
        name: subject.name,
        subjectType: subject.subjectType,
      }
      return subjectListItem
    })
  }

  public getSubjectForActor(actor: Actor, subjectNationalId: string): Subject {
    const availableSubjectEntities: Subject[] = actor.subjectIds.map(
      (x: number) => {
        return this.db.subjects.find(x) as Subject
      },
    )
    const subjectEntity = availableSubjectEntities.find(
      (x) => x.nationalId === subjectNationalId,
    )

    return subjectEntity
  }

  public getScopesForSession(actor: Actor, subject: Subject): string[] {
    return []
  }

  public getRefreshToken(uuid: string): RefreshToken {
    const rawRefreshTokens = window.localStorage.getItem('mirageDB_refreshTokens') || JSON.stringify([]);
    const refreshTokens = JSON.parse(rawRefreshTokens);
    const tokenEntity = refreshTokens.find(
      (x: RefreshToken) => x.payload === uuid
    ) as RefreshToken
    if(!tokenEntity) return null
    const refreshToken = Object.assign(new RefreshToken(), tokenEntity)
    return refreshToken
  }

  public createRefreshToken(nationalId: string, subjectNationalId: string): RefreshToken {
    const newToken = new RefreshToken(nationalId, subjectNationalId)
    const rawRefreshTokens = window.localStorage.getItem('mirageDB_refreshTokens') || JSON.stringify([]);
    const refreshTokens = JSON.parse(rawRefreshTokens);
    refreshTokens.push(newToken);
    window.localStorage.setItem('mirageDB_refreshTokens', JSON.stringify(refreshTokens));

    return newToken
  }
}
