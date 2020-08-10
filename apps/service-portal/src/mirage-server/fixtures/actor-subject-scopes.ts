import { ActorSubjectScopes } from '../models/actor-subject-scopes';
import actors from './actors'
import subjects from './subjects'

const user1 = actors.find(x => x.name  === 'Ólafur Björn Magnússon')
const subject1 = subjects.find(x => x.name  === 'Ólafur Björn Magnússon')

const user2 = actors.find(x => x.name  === 'Baltasar Kormákur')
const subject2 = subjects.find(x => x.name  === 'Ólafur Björn Magnússon')
const subject3 = subjects.find(x => x.name  === 'Sendiráðið')

const actorSubjectScopes = actors.map((actor) => {
    return {
      actorId: actor.id,
      subjectId: subject1.id,
      scopeIds: [1, 2, 3, 4]
    }
})

export default actorSubjectScopes as ActorSubjectScopes[]
/*export default [
  {
    actorId: user1.id,
    subjectId: subject1.id,
    scopeIds: [1, 2, 3, 4]
  },
  {
    actorId: user1.id,
    subjectId: subject1.id,
    scopeIds: [1, 2, 3, 4]
  },
  {
    actorId: 1,
    subjectId: 2,
    scopeIds: [1, 2, 3, 4]
  },
  {
    actorId: 1,
    subjectId: 2,
    scopeIds: [1, 2, 3, 4]
  },
  {
    actorId: 1,
    subjectId: 2,
    scopeIds: [1, 2, 3, 4]
  },
] as ActorSubjectScopes[]*/
