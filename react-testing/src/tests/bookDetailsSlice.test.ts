import { configureStore } from '@reduxjs/toolkit'
import { changeSearchValue } from '../store/homeSearchSlice'
import actionsOrder from './utils/actionsOrder'
import { reducer } from '../store'
import { toggleCoverFetching, toggleExpand } from '../store/bookDetailsSlice'

const preloadedState = {
    bookDetails: {
        isCoverFetching: false,
        isExpanded: false,
    } as any,
}

describe('Async bookDetailsActions thunk', () => {
    it('> fetchBooks', async () => {
        await actionsOrder(changeSearchValue('Javascript'), [
            'homeSearch/changeSearchValue/pending',
            'homeSearch/setSearchValue',
            'homeSearch/searchBooks/pending',
            'homeSearch/toggleIsFetching',
            'homeSearch/searchBooks/fulfilled',
            'homeSearch/changeSearchValue/fulfilled',
        ])
    })
})
describe('Sync bookDetailsActions actions', () => {
    it('> toggleCoverFetching', async () => {
        const store = configureStore({ reducer, preloadedState })
        store.dispatch(toggleCoverFetching())
        expect(store.getState().bookDetails.isCoverFetching).toBe(true)
    })
    it('> toggleExpand', async () => {
        const store = configureStore({ reducer, preloadedState })
        store.dispatch(toggleExpand())
        expect(store.getState().bookDetails.isExpanded).toBe(true)
    })
})
