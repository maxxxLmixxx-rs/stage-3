/* eslint-disable camelcase */

export type BookRaw = {
    description?: {
        key: string
        value: string
    }
    publish?: string
    subjects: string[]
    key: string
    title: string
    authors: {
        type: { key: string }
        author: { key: string }
    }[]
    type: {
        key: string
    }
    covers: number[]
    latest_revision: number
    revision: number
    created: {
        type: string
        value: Date
    }
    last_modified: {
        type: string
        value: Date
    }
}
