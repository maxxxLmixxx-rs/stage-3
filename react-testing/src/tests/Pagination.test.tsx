import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import Pagination from '../components/@common/Pagination/Pagination'

describe('Pagination component', () => {
    const ActiveClassName = 'current'
    let Component: React.FC

    beforeEach(() => {
        Component = (): JSX.Element => {
            const [page, setPage] = useState(1)
            return (
                <Pagination maxPages={10} page={page} onPageChange={setPage} />
            )
        }
    })

    it('[1] -> 2 page click changes .current', async () => {
        render(<Component />)
        expect(screen.getByText('1')).toHaveClass(ActiveClassName)
        expect(screen.getByText('2')).not.toHaveClass(ActiveClassName)
        userEvent.click(screen.getByText('2'))
        expect(screen.getByText('1')).not.toHaveClass(ActiveClassName)
        expect(screen.getByText('2')).toHaveClass(ActiveClassName)
    })
})
