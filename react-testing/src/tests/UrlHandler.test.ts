import UrlHandler from '../utils/FetchHandler/UrlHandler'

const baseUrl = 'https://www.domain.com'
const baseSecondUrl = 'https://www.example.com'

/** @TODO */
/**
 * 1. .base should not clear previous path
 * 2. Order should not be matter
 */

describe('urlHandler.base', () => {
    it('reassign base in the middle of the chain only clear previous path', () => {
        const urlHandler = new UrlHandler()
        const url = urlHandler
            .base(baseUrl)
            .path('/some', 'random', 'path/')
            .query({ name: 'Natalia' })
            .base(baseSecondUrl).end
        expect(url).toBe(`${baseSecondUrl}?name=Natalia`)
    })
})
describe('urlHandler.path', () => {
    it('paths resolve different slashes in params', () => {
        const urlHandler = new UrlHandler()
        const url = urlHandler
            .base(baseUrl)
            .path('/some', 'random', 'path/').end
        expect(url).toBe(`${baseUrl}/some/random/path`)
    })
})
describe('urlHandler.query', () => {
    it('empty query do nothing', () => {
        const urlHandler = new UrlHandler()
        const url = urlHandler.base(baseUrl).query({}).end
        expect(url).toBe(baseUrl)
    })
    it('different query types conversation [string, number, boolean]', () => {
        const urlHandler = new UrlHandler()
        const url = urlHandler.base(baseUrl).query({
            name: 'Natalia',
            age: 24,
            male: 'female',
            town: false,
        }).end
        expect(url).toBe(
            `${baseUrl}?name=Natalia&age=24&male=female&town=false`
        )
    })
})
describe('urlHandler.mixed', () => {
    it('order of .query, .path does not matter', () => {
        const urlHandler = new UrlHandler()
        const result = `${baseUrl}/top/face/girls?name=Natalia`
        const url1 = urlHandler
            .base(baseUrl)
            .query({ name: 'Natalia' })
            .path('/top', 'face/', '/girls/').end
        const url2 = urlHandler
            .base(baseUrl)
            .path('/top', 'face/', '/girls/')
            .query({ name: 'Natalia' }).end
        expect(url1).toBe(result)
        expect(url2).toBe(result)
    })
    it('base should be first', () => {
        const urlHandler = new UrlHandler()
        expect(
            () =>
                urlHandler
                    .path('/top', 'face/', '/girls/')
                    .query({ name: 'Natalia' })
                    .base(baseUrl).end
        ).toThrow()
    })
})
