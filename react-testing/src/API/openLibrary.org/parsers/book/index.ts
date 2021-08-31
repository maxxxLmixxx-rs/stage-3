import { BookRaw as B } from './BookRaw'

export type BookRaw = B

export type Book = {
    description: string
    title: string
    coverLinks: string[]
    id: string
    authors: string[]
    publish: string | null
}

type Swap<T, K> = Omit<T, keyof K> & K
type ToParseBook = Swap<
    BookRaw,
    {
        authors: string[]
        covers: string[]
    }
>

const parseBookData = (data: ToParseBook): Book => {
    const { description, title, covers, key, authors, publish = null } = data
    return {
        description: description?.value || '',
        title,
        coverLinks: covers,
        id: key,
        authors,
        publish,
    }
}

export default parseBookData
