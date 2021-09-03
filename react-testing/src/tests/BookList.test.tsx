import { render, screen } from '@testing-library/react'
import { createHashHistory } from 'history'
import React, { useState } from 'react'
import { Router } from 'react-router-dom'
import { BookTitle } from '../API/openLibrary.org/parsers/search'
import BookList from '../components/@pages/Home/BookList/BookList'

describe('Render elements in BookList', () => {
    type BookListProps = React.ComponentProps<typeof BookList>
    let Component: React.FC<Partial<BookListProps>>

    const bookTitles: BookTitle[] = [
        {
            id: '1',
            author: 'Jack London',
            title: 'The Sea Wolf',
        },
    ]

    beforeEach(() => {
        // NavLink should render in scope of <Router />
        const history = createHashHistory()

        Component = (props) => {
            const [page, setPage] = useState(1)
            const {
                showPagination = false,
                books = bookTitles,
                isFetching = false,
                maxPages = 10,
            } = props
            return (
                <Router history={history}>
                    <BookList
                        showPagination={showPagination}
                        books={books}
                        isFetching={isFetching}
                        maxPages={maxPages}
                        page={page}
                        setPage={setPage}
                    />
                </Router>
            )
        }
    })

    it('Show title, author', async () => {
        render(<Component showPagination={false} />)
        expect(screen.getByText(/jack london/i)).toBeInTheDocument()
        expect(screen.getByText(/the sea wolf/i)).toBeInTheDocument()
    })
    it('Show pagination', async () => {
        const { container } = render(<Component showPagination />)
        expect(container.querySelector('.Pagination')).toBeInTheDocument()
    })
    it('Show loader', async () => {
        const { container } = render(<Component isFetching />)
        expect(container.querySelector('.Loader')).toBeInTheDocument()
    })
})
