/* eslint-disable camelcase */

import { SearchRaw as S } from './SearchRaw'

export type SearchRaw = S

export type BookTitle = {
    author: string
    id: string
    title: string
}

export type Search = {
    maxBooks: number
    books: BookTitle[]
}

const parseSearchData = (data: SearchRaw): Search => {
    const { numFound = 0, docs = [] } = data
    const books = docs.map(({ key = 'NaN', title = '', author_name = [] }) => ({
        id: key.split('/')[2],
        title,
        author: author_name.join(' '),
    }))
    return {
        maxBooks: numFound,
        books,
    }
}

export default parseSearchData
