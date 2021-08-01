import FetchHandler from '../../utils/FetchHandler/FetchHandler.ts'
import parseAuthorData, { Author, AuthorRaw } from './parsers/author'
import parseSearchData, { Search, SearchRaw } from './parsers/search'
import parseBookData, { Book, BookRaw } from './parsers/book'

const Fetch = new FetchHandler({
    baseUrl: 'https://openlibrary.org/',
})

export type SortParams = 'editions' | 'new' | 'old'

type SearchParams = {
    value: string
    page: number
    limit: number
    sort: SortParams
}

const coverIdToLink = (coverId: number): string => {
    const size = 'L' as 'S' | 'M' | 'L'
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

class OpenLibrary {
    private controller?: AbortController
    private signal?: AbortSignal

    skipAbort = (callback: (e: Error) => void) => {
        return (e: Error) => {
            const name = 'AbortError'
            const error = e.name === name ? undefined : e
            if (error) callback(error)
        }
    }

    abortPrevious(): this {
        if (this.controller) {
            this.controller.abort()
        }
        this.controller = new AbortController()
        this.signal = this.controller.signal
        return this
    }

    async search(params: SearchParams): Promise<Search> {
        const { value, page, sort, limit } = params
        const signal = this.signal ? { signal: this.signal } : {}
        const response = await Fetch.path('search.json')
            .query({
                q: value,
                page,
                sort,
                limit,
            })
            .req<SearchRaw>({ ...signal })
        return parseSearchData(response.data)
    }

    async author(authorId: string): Promise<Author> {
        const authorPaths = ['authors', `${authorId}.json`]
        const response = await Fetch.path(...authorPaths).req<AuthorRaw>()
        return parseAuthorData(response.data)
    }

    async book(bookId: string): Promise<Book> {
        const bookPaths = ['works', `${bookId}.json`]
        const response = await Fetch.path(...bookPaths).req<BookRaw>()
        const authorsPromises = response.data.authors
            .map((au) => au.author.key)
            .map((pa) => pa.split('/')[2])
            .map((id) => this.author(id))
        const authorNames = await Promise.all(authorsPromises)
        const uniqueAuthors = new Set(authorNames.map((n) => n.name))
        return parseBookData({
            ...response.data,
            covers: response.data?.covers?.map(coverIdToLink) || [],
            authors: Array.from(uniqueAuthors),
        })
    }
}

export default new OpenLibrary()
