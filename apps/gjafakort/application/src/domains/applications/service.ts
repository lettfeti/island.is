import merge from 'lodash/merge'
import isArray from 'lodash/isArray'

import Application from './model'
import { model as AuditLog } from '../audit'

export const getApplicationByIssuerAndType = (
  issuerSSN: string,
  type: string,
): Promise<Application> =>
  Application.findOne({
    where: { type, issuerSSN },
    include: [
      {
        model: AuditLog,
      },
    ],
    order: [[AuditLog, 'created', 'ASC']],
  })

export const getApplicationById = (
  applicationId: string,
): Promise<Application> =>
  Application.findOne({
    where: { id: applicationId },
    include: [
      {
        model: AuditLog,
      },
    ],
    order: [[AuditLog, 'created', 'ASC']],
  })

export const getApplicationsByType = (type: string): Promise<Application[]> =>
  Application.findAll({
    where: { type },
    include: [
      {
        model: AuditLog,
      },
    ],
    order: [[AuditLog, 'created', 'ASC']],
  })

export const getApplicationCountByType = (type: string): Promise<number> =>
  Application.count({
    where: { type },
  })

export const createApplication = (
  issuerSSN: string,
  type: string,
  state: string,
  data: object,
): Promise<Application> => Application.create({ issuerSSN, type, state, data })

export const updateApplication = (
  application: Application,
  state: string,
  data: object,
): Promise<Application> => {
  const mergedData = merge(application.data, data, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
  return application.update({ state, data: mergedData })
}

export const updateApplicationState = (
  application: Application,
  state: string,
): Promise<Application> => {
  return application.update({ state })
}
