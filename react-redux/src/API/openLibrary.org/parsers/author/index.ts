import { AuthorRaw as A } from './AuthorRaw'

export type AuthorRaw = A

export type Author = {
    name: string
}

const parseAuthorData = (data: AuthorRaw): Author => {
    return { name: data.name || '' }
}

export default parseAuthorData
