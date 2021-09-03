import UrlHandler from './UrlHandler'

type Unpromisify<T> = T extends Promise<infer R> ? R : T
type Any = Unpromisify<ReturnType<Body['json']>>

type FetchHandlerConfig = {
    baseUrl: string
    fetch?: RequestInit
}

type FetchHandlerResponse<T = Any> = {
    response: Response
    data: T
}

class FetchHandler extends UrlHandler {
    private config: Omit<FetchHandlerConfig, 'baseUrl'>

    constructor(config: FetchHandlerConfig) {
        const { baseUrl = '', fetch: fetchParams = {} } = config
        super(baseUrl)
        this.config = {
            fetch: {
                method: 'GET',
                ...fetchParams,
            },
        }
    }

    async req<T>(fetchParams?: RequestInit): Promise<FetchHandlerResponse<T>> {
        const response = await fetch(this.end, {
            ...this.config.fetch,
            ...fetchParams,
        })
        const data = await response.json()
        return { response, data }
    }
}

export default FetchHandler
