import {
  Query,
  Resolver,
  Context,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'

import { Logger, LOGGER_PROVIDER } from '@island.is/logging'
import { AuditedAction } from '@island.is/judicial-system/audit-trail'
import { User } from '@island.is/judicial-system/types'
import {
  CurrentGraphQlUser,
  JwtGraphQlAuthGuard,
} from '@island.is/judicial-system/auth'

import { BackendAPI } from '../../../services'
import { CaseInterceptor, CasesInterceptor } from './interceptors'
import { CaseAuditService } from './case.audit'
import {
  CreateCaseInput,
  UpdateCaseInput,
  TransitionCaseInput,
  SendNotificationInput,
  RequestSignatureInput,
  SignatureConfirmationQueryInput,
  CaseQueryInput,
} from './dto'
import {
  Case,
  Notification,
  RequestSignatureResponse,
  SendNotificationResponse,
  SignatureConfirmationResponse,
} from './models'

@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => Case)
export class CaseResolver {
  constructor(
    @Inject(CaseAuditService)
    private readonly caseAuditService: CaseAuditService,
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Query(() => [Case], { nullable: true })
  @UseInterceptors(CasesInterceptor)
  cases(
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case[]> {
    this.logger.debug('Getting all cases')

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.OVERVIEW,
      backendApi.getCases(),
      (cases: Case[]) => cases.map((aCase) => aCase.id),
    )
  }

  @Query(() => Case, { nullable: true })
  @UseInterceptors(CaseInterceptor)
  async case(
    @Args('input', { type: () => CaseQueryInput })
    input: CaseQueryInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    this.logger.debug(`Getting case ${input.id}`)

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.VIEW_DETAILS,
      backendApi.getCase(input.id),
      input.id,
    )
  }

  @Mutation(() => Case, { nullable: true })
  @UseInterceptors(CaseInterceptor)
  createCase(
    @Args('input', { type: () => CreateCaseInput })
    input: CreateCaseInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    this.logger.debug('Creating case')

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.CREATE,
      backendApi.createCase(input),
      (theCase) => theCase.id,
    )
  }

  @Mutation(() => Case, { nullable: true })
  @UseInterceptors(CaseInterceptor)
  updateCase(
    @Args('input', { type: () => UpdateCaseInput })
    input: UpdateCaseInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    const { id, ...updateCase } = input

    this.logger.debug(`Updating case ${id}`)

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.UPDATE,
      backendApi.updateCase(id, updateCase),
      id,
    )
  }

  @Mutation(() => Case, { nullable: true })
  @UseInterceptors(CaseInterceptor)
  transitionCase(
    @Args('input', { type: () => TransitionCaseInput })
    input: TransitionCaseInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    const { id, ...transitionCase } = input

    this.logger.debug(`Transitioning case ${id}`)

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.TRANSITION,
      backendApi.transitionCase(id, transitionCase),
      id,
    )
  }

  @Mutation(() => RequestSignatureResponse, { nullable: true })
  requestSignature(
    @Args('input', { type: () => RequestSignatureInput })
    input: RequestSignatureInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<RequestSignatureResponse> {
    this.logger.debug(`Requesting signature of ruling for case ${input.caseId}`)

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.REQUEST_SIGNATURE,
      backendApi.requestSignature(input.caseId),
      input.caseId,
    )
  }

  @Query(() => SignatureConfirmationResponse, { nullable: true })
  signatureConfirmation(
    @Args('input', { type: () => SignatureConfirmationQueryInput })
    input: SignatureConfirmationQueryInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<SignatureConfirmationResponse> {
    const { caseId, documentToken } = input

    this.logger.debug(`Confirming signature of ruling for case ${caseId}`)

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.CONFIRM_SIGNATURE,
      backendApi.getSignatureConfirmation(caseId, documentToken),
      caseId,
    )
  }

  @Mutation(() => SendNotificationResponse, { nullable: true })
  sendNotification(
    @Args('input', { type: () => SendNotificationInput })
    input: SendNotificationInput,
    @CurrentGraphQlUser() user: User,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<SendNotificationResponse> {
    const { caseId, ...sendNotification } = input

    this.logger.debug(`Sending notification for case ${caseId}`)

    return this.caseAuditService.audit(
      user.id,
      AuditedAction.SEND_NOTIFICATION,
      backendApi.sendNotification(caseId, sendNotification),
      caseId,
    )
  }

  @ResolveField(() => [Notification])
  async notifications(
    @Parent() existingCase: Case,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Notification[]> {
    const { id } = existingCase

    return backendApi.getCaseNotifications(id)
  }
}
