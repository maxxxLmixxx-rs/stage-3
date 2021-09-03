/* eslint-disable */

export type Book = {
    key: string
    text: string[]
    type: string
    seed: string[]
    title: string
    title_suggest: string
    has_fulltext: boolean
    edition_count: number
    edition_key: string[]
    publish_date: string[]
    publish_year: number[]
    first_publish_year: number
    lccn: string[]
    publish_place: string[]
    oclc: string[]
    lcc: string[]
    ddc: string[]
    isbn: string[]
    last_modified_i: number
    ebook_count_i: number
    ia: string[]
    public_scan_b: boolean
    ia_collection_s: string
    lending_edition_s: string
    lending_identifier_s: string
    printdisabled_s: string
    cover_edition_key: string
    cover_i: number
    publisher: string[]
    language: string[]
    author_key: string[]
    author_name: string[]
    subject: string[]
    id_goodreads: string[]
    id_librarything: string[]
    ia_box_id: string[]
    publisher_facet: string[]
    subject_facet: string[]
    _version_: number
    lcc_sort: string
    author_facet: string[]
    subject_key: string[]
    ddc_sort: string
}

export type BookData = {
    numFound: number
    start: number
    numFoundExact: boolean
    docs: Book[]
    num_found: number
    q: string
    offset: number | null
}
