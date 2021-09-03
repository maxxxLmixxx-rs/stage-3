import OpenLibrary from '../API/openLibrary.org'

type UnPromisify<T> = T extends Promise<infer R> ? R : T
type OLKey = keyof typeof OpenLibrary
type OLFunctionType<T extends OLKey> = UnPromisify<
    ReturnType<typeof OpenLibrary[T]>
>

/**
 * @RealAPI
 */

describe('Book data should contain', () => {
    let data: OLFunctionType<'book'>

    beforeAll((done) => {
        OpenLibrary.abortPrevious()
            .book('OL2040128W')
            .then((fetched) => {
                data = fetched
                done()
            })
    })

    it('-id', async () => {
        expect(data.id).not.toBeUndefined()
    })
    it('-title', async () => {
        expect(data.title).not.toBeUndefined()
    })
})
describe('Search data should contain', () => {
    let data: OLFunctionType<'search'>

    beforeAll((done) => {
        OpenLibrary.abortPrevious()
            .search({
                limit: 1,
                page: 1,
                sort: 'editions',
                value: 'Javascript',
            })
            .then((fetched) => {
                data = fetched
                done()
            })
    })

    it('-maxBooks', async () => {
        expect(data.maxBooks).not.toBeUndefined()
    })
    it('-books', async () => {
        expect(data.books).not.toBeUndefined()
    })
    it('-books.id', async () => {
        expect(data.books[0].id).not.toBeUndefined()
    })
    it('-books.author', async () => {
        expect(data.books[0].author).not.toBeUndefined()
    })
    it('-books.title', async () => {
        expect(data.books[0].title).not.toBeUndefined()
    })
})
describe('Author data should contain', () => {
    let data: OLFunctionType<'author'>

    beforeAll((done) => {
        OpenLibrary.abortPrevious()
            .author('OL2734307A')
            .then((fetched) => {
                data = fetched
                done()
            })
    })

    it('-name', async () => {
        expect(data.name).not.toBeUndefined()
    })
})
