type Query = {
    [key: string]: string | number | boolean
}

type UrlObject = {
    params: Query
    base: string
    protocol: string
}

class UrlHandler {
    /** Static */

    static initial: UrlObject = {
        params: {},
        base: '',
        protocol: '',
    }

    static trimSlashes(value: string): string {
        return value.replace(/^\/|\/$/g, '')
    }

    static resolveQuery(params: Query): string {
        const query = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
        return query ? `?${query}` : ''
    }

    static parseQuery(url: string): [string, Query] {
        const [base = '', queryString = ''] = url.split('?')
        const query = Object.fromEntries(
            queryString
                .split('&')
                .map((q) => q.split('='))
                .filter(([k, v]) => k && v && typeof v !== 'number')
        )
        return [UrlHandler.trimSlashes(base), query]
    }

    /** Errors */

    protected errors = {
        noBase: (method: string): string =>
            `Base should not be empty. Call [.base] before [.${method}] method`,
    }

    /** Variable declaration */

    protected toReset = UrlHandler.initial
    protected output = UrlHandler.initial

    /** Constructor */

    constructor(baseUrl = '') {
        this.base(baseUrl)
        this.toReset = { ...this.output }
        this.resetOutput()
    }

    /** Utilities */

    private isBase(): boolean {
        return Boolean(this.output.base)
    }

    private resetOutput(): void {
        this.output = { ...this.toReset }
    }

    /** Public interface */

    /**
     * @example Instance.base(`https://www.domain.com`)
     */

    base(url: string): this {
        const normUrl = UrlHandler.trimSlashes(url)
        const [protocol = 'https', base = ''] = normUrl.split('://')
        const [baseOmitted, queries] = UrlHandler.parseQuery(base)
        this.output = {
            ...this.output,
            base: baseOmitted,
            protocol,
            params: {
                ...this.output.params,
                ...queries,
            },
        }
        return this
    }

    /**
     * @example
     * Instance.path(`/part`, `/of/`, 'path')
     */

    path(...urlPaths: string[]): this {
        if (!this.isBase()) {
            throw new Error(this.errors.noBase('path'))
        }
        const paths = urlPaths.map(UrlHandler.trimSlashes)
        this.output.base += `/${paths.join('/')}`
        return this
    }

    /**
     * @example
     * Instance.query({ param: `value` })
     */

    query(params: Query | null): this {
        if (!this.isBase()) {
            throw new Error(this.errors.noBase('query'))
        }
        this.output.params =
            params !== null
                ? (this.output.params = { ...this.output.params, ...params })
                : {}
        return this
    }

    /** End chain */

    private isEmpty(): boolean {
        return !Object.values(this.output).filter(Boolean).length
    }

    /**
     * @example
     * Instance.base().path().query().end
     */

    get end(): string {
        const { protocol, base, params } = this.output
        if (this.isEmpty()) return ''
        const res = `${protocol}://${base}${UrlHandler.resolveQuery(params)}`
        this.resetOutput()
        return UrlHandler.trimSlashes(res)
    }
}

export default UrlHandler
