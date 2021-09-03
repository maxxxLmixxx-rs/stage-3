import { screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { BookTitle } from '../API/openLibrary.org/parsers/search'
import { SearchObject } from '../store/homeSearchSlice'
import Home from '../components/@pages/Home/Home'
import renderWithRedux from './utils/renderWithRedux'
import store from '../store'

describe('Test <Home />', () => {
    let Component: React.FC

    const initialState = {
        homeSearch: {
            bookTitles: [] as BookTitle[],
            isFetching: true,
            search: {
                value: '',
                page: 1,
                maxPages: null,
                limit: 5,
                sort: 'editions',
            } as SearchObject,
        },
    }

    beforeEach(() => {
        Component = (): JSX.Element => {
            return <Home />
        }
    })

    it('Search is in the document', async () => {
        renderWithRedux(<Component />, initialState)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
    it('Heading is in the document', async () => {
        renderWithRedux(<Component />, initialState)
        expect(screen.getByRole('heading')).toBeInTheDocument()
    })
    it('button(Most editions) click', () => {
        renderWithRedux(<Component />, initialState)
        userEvent.click(screen.getByText('Most Editions'))
        expect(store.getState().homeSearch.search.sort).toBe('editions')
    })
    it('button(First Published) click', () => {
        renderWithRedux(<Component />, initialState)
        const buttonText = 'First Published'
        userEvent.click(screen.getByText(buttonText))
        expect(screen.getByText(buttonText)).toHaveClass('active')
    })
    it('button(Most Recent) click', () => {
        renderWithRedux(<Component />, initialState)
        const buttonText = 'Most Recent'
        userEvent.click(screen.getByText(buttonText))
        expect(screen.getByText(buttonText)).toHaveClass('active')
    })
})
