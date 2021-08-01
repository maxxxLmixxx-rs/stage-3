/* eslint-disable camelcase */

export type AuthorRaw = {
    name: string
    key: string
    revision: number
    type: {
        key: string
    }
    last_modified: {
        type: string
        value: Date
    }
    created?: {
        type: string
        value: Date
    }
    alternate_names?: string[]
    personal_name?: string
    latest_revision?: number
}
