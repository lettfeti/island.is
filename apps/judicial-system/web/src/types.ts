export enum CaseState {
  UNKNOWN = 'Óþekkt',
  DRAFT = 'Drög',
  SUBMITTED = 'Krafa staðfest',
  ACTIVE = 'Gæsluvarðhald virkt',
  COMPLETED = 'Gæsluvarðhaldi lokið',
}

export interface Case {
  id: string
  policeCaseNumber: string
  suspectName: string
  suspectNationalId: string
  created: string
  modified: string
  state: CaseState
}

export interface GetCaseByIdResponse {
  httpStatusCode: number
  case?: Case
}

export interface CreateCaseRequest {
  policeCaseNumber: string
  suspectNationalId: string
}

export interface CreateDetentionReqStepOneFields {
  policeCaseNumber: string
  suspectNationalId: string
  suspectName: string
  suspectAddress: string
  court: string
  arrestDate: Date
  arrestTime: string
  requestedCourtDate: Date
}

export interface CreateDetentionReqStepTwoFields {
  courtClaimDate: Date
  courtClaimTime: string
  offense: string
  offenseParagraph: string
}

export interface CreateDetentionReqStepOneCase {
  id: string
  case: CreateDetentionReqStepOneFields
}

export interface CreateDetentionReqStepTwoCase {
  id: string
  case: CreateDetentionReqStepTwoFields
}
