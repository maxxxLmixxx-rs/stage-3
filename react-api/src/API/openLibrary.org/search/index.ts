/* eslint-disable camelcase */

import FetchHandler from '../../../utils/FetchHandler/FetchHandler.ts'
import bookConfig from './config.json'
import { BookData } from './book'

const Fetch = new FetchHandler({
    baseUrl: bookConfig.baseUrl,
})

export type SortParams = 'editions' | 'new' | 'old'
export type BookTitle = { title: string; author: string }

type SearchParams = {
    value: string
    page: number
    limit: number
    sort: SortParams
}

type SearchResult = {
    maxBooks: number
    books: BookTitle[]
}

const parseBookData = (data: BookData): SearchResult => {
    const { numFound = 0, docs = [] } = data
    const books = docs.map(({ title = '', author_name = [] }) => ({
        title,
        author: author_name.join(' '),
    }))
    return {
        maxBooks: numFound,
        books,
    }
}

class SearchApi {
    private controller?: AbortController
    private signal?: AbortSignal

    skipAbort = (callback: (e: Error) => void) => {
        return (e: Error) => {
            const name = 'AbortError'
            const error = e.name === name ? undefined : e
            if (error) callback(error)
        }
    }

    async search(params: SearchParams): Promise<SearchResult> {
        const { value, page, sort, limit } = params
        const signal = this.signal ? { signal: this.signal } : {}
        const response = await Fetch.query({
            q: value,
            page,
            sort,
            limit,
        }).req<BookData>({ ...signal })
        return parseBookData(response.data)
    }

    abortPrevious(): this {
        if (this.controller) {
            this.controller.abort()
        }
        this.controller = new AbortController()
        this.signal = this.controller.signal
        return this
    }
}

export default new SearchApi()
