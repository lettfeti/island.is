import { getLocalizedEntries } from './contentful'
import { logger } from '@island.is/logging'
import {
  Image,
  Article,
  News,
  Namespace,
  Pagination,
} from '@island.is/api/schema'
import { ApolloError } from 'apollo-server-express'

const formatArticle = ({ sys, fields }): Article => {
  return {
    id: sys.id,
    slug: fields.slug,
    title: fields.title,
    group: fields.group?.fields,
    category: fields.category?.fields,
    content: JSON.stringify(fields.content),
  }
}

const formatImage = ({ fields }): Image => ({
  url: fields.file.url,
  title: fields.title,
  contentType: fields.file.contentType,
  width: fields.file.details.image.width,
  height: fields.file.details.image.height,
})

const formatNewsItem = ({ fields, sys }): News => ({
  id: sys.id,
  slug: fields.slug,
  title: fields.title,
  intro: fields.intro,
  image: formatImage(fields.image),
  date: fields.date,
  content: JSON.stringify(fields.content),
})

const makePage = (
  page: number,
  perPage: number,
  totalResults: number,
): Pagination => ({
  page,
  perPage,
  totalResults,
  totalPages: Math.ceil(totalResults / perPage),
})

export const getArticle = async (
  slug: string,
  lang: string,
): Promise<Article> => {
  const result = await getLocalizedEntries<Article>(lang, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'article',
    'fields.slug': slug,
    include: 10,
  }).catch((error) => {
    logger.error(error)
    throw new ApolloError('Failed to resolve request in getArticle')
  })

  // if we have no results
  if (!result.total) {
    return null
  }

  return formatArticle(result.items[0])
}

export const getNews = async (lang: string, slug: string) => {
  const r = await getLocalizedEntries<News>(lang, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'news',
    include: 10,
    'fields.slug': slug,
  }).catch((error) => {
    logger.error(error)
    throw new Error('Failed to resolve request in getArticle')
  })

  return r.items[0] && formatNewsItem(r.items[0])
}

export const getNewsList = async (
  lang: string,
  year: number,
  month: number,
  ascending: boolean,
  page = 1,
  perPage = 10,
) => {
  const params = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'news',
    include: 10,
    order: (ascending ? '' : '-') + 'fields.date',
    skip: (page - 1) * perPage,
    limit: perPage,
  }

  if (year) {
    params['fields.date[gte]'] = new Date(year, month ?? 0, 1)
    params['fields.date[lt]'] =
      month != undefined
        ? new Date(year, month + 1, 1)
        : new Date(year + 1, 0, 1)
  }

  const r = await getLocalizedEntries<News>(lang, params).catch((error) => {
    logger.error(error)
    throw new Error('Failed to resolve request in getNewsList')
  })

  return {
    page: makePage(page, perPage, r.total),
    news: r.items.map(formatNewsItem),
  }
}

export const getNamespace = async (
  namespace: string,
  lang: string,
): Promise<Namespace> => {
  const result = await getLocalizedEntries<Namespace>(lang, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'uiConfiguration',
    'fields.namespace': namespace,
  }).catch((error) => {
    logger.error(error)
    throw new ApolloError('Failed to resolve request in getNamespace')
  })

  // if we have no results
  if (!result.total) {
    return null
  }

  const [
    {
      fields: { fields },
    },
  ] = result.items

  return {
    namespace,
    fields: JSON.stringify(fields),
  }
}
