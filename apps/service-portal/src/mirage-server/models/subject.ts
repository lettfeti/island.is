export class Subject {
  id: number
  name: string
  nationalId: string
  subjectType: 'person' | 'company' | 'institution'
}

export type SubjectDto = Omit<Subject, 'id'>
export type SubjectListDto = Omit<Subject, 'id' | 'scope'>
