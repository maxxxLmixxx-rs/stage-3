class Links<T extends { [k: string]: string[] }> {
    constructor(private links: T) {}
    private first(key: keyof T): string {
        const link = this.links[key]
        return Array.isArray(link) ? this.links[key][0] : link
    }
    navLink(key: keyof T): string {
        return this.first(key)
    }
    route(key: keyof T): string | string[] {
        const link = this.links[key]
        return Array.isArray(link) && link.length > 1 ? link : link[0]
    }
    params(key: keyof T): string[] {
        return this.first(key).split('/:').slice(1)
    }
    path(key: keyof T): string {
        return this.first(key).split('/:')[0]
    }
}

export default new Links({
    home: ['/', '/home'],
    about: ['/about'],
    details: ['/details/:bookId'],
})
