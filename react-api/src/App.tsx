import React, { useEffect, useState } from 'react'
import s from './App.scss'
import classnames from './utils/classnames'
import SmartSearch from './components/SmartSearch/SmartSearch'
import RoundButton from './components/@button/RoundButton/RoundButton'
import FindBook, { BookTitle, SortParams } from './API/openLibrary.org/search'
import BookList from './components/BookList/BookList'

const cx = classnames.bind(s)

const App: React.FC = () => {
    const [limit] = useState(5)
    const [maxPages, setMaxPages] = useState<number | null>(null)
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState<SortParams>('editions')
    const [searchValue, setSearchValue] = useState('')

    const [searchResult, setSearchResult] = useState<BookTitle[]>([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        if (searchValue) {
            setIsFetching(true)
            const searchParams = { value: searchValue, limit, page, sort }
            FindBook.abortPrevious()
                .search(searchParams)
                .then(({ maxBooks, books }) => {
                    setMaxPages(Math.floor(maxBooks / limit) - 1)
                    setSearchResult(books)
                    setIsFetching(false)
                })
                .catch(FindBook.skipAbort(console.error))
        }
    }, [page, limit, sort, searchValue])

    useEffect(() => {
        setMaxPages(null)
        setPage(1)
    }, [limit, sort, searchValue])

    return (
        <div className={cx('App')}>
            <div className={cx('Logo')}>
                <img src="./logo.svg" alt="logo" />
                <h1>Find the book</h1>
            </div>
            <div className={cx('Search')}>
                <SmartSearch
                    placeholder="Search"
                    value={searchValue}
                    onChange={({ currentTarget: { value } }) => {
                        setSearchValue(value)
                    }}
                    onExpand={
                        <BookList
                            showPagination={!!searchValue}
                            books={searchResult}
                            isFetching={isFetching}
                            maxPages={maxPages}
                            page={page}
                            setPage={setPage}
                        />
                    }
                />
                <div className={cx('controls')}>
                    <RoundButton
                        active={sort === 'editions'}
                        onClick={() => setSort('editions')}
                    >
                        Most Editions
                    </RoundButton>
                    <RoundButton
                        active={sort === 'old'}
                        onClick={() => setSort('old')}
                    >
                        First Published
                    </RoundButton>
                    <RoundButton
                        active={sort === 'new'}
                        onClick={() => setSort('new')}
                    >
                        Most Recent
                    </RoundButton>
                </div>
            </div>
        </div>
    )
}

export default App
