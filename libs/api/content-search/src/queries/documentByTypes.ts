import { logger } from '@island.is/logging'
import { sortableFields } from '../types'

export interface DocumentByTypesInput {
  types: string[]
  sort?: sortableFields
  size?: number
}

type termQuery = {
  terms: {
    type: string[]
  }
}

export interface DocumentByTypesRequestBody {
  query: {
    bool: {
      must: termQuery[]
    }
  }
  sort: sortableFields[]
  size: number
}

export const documentByTypeQuery = ({
  types,
  sort = {},
  size = 10,
}: DocumentByTypesInput): DocumentByTypesRequestBody => {
  logger.info(types)
  logger.info('some', { size })
  const query = {
    query: {
      bool: {
        must: [
          {
            terms: {
              type: types,
            },
          },
        ],
      },
    },
    sort: Object.entries(sort).map(([key, value]) => ({ [key]: value })), // elastic wants sorts as array og object with single keys
    size,
  }

  return query
}