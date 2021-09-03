import {
    changePage,
    changeSearchValue,
    changeSort,
} from '../store/homeSearchSlice'
import actionsOrder from './utils/actionsOrder'

describe('Async homeSearchActions thunk', () => {
    it('> changeSearchValue', async () => {
        await actionsOrder(changeSearchValue('Javascript'), [
            'homeSearch/changeSearchValue/pending',
            'homeSearch/setSearchValue',
            'homeSearch/searchBooks/pending',
            'homeSearch/toggleIsFetching',
            'homeSearch/searchBooks/fulfilled',
            'homeSearch/changeSearchValue/fulfilled',
        ])
    })
    it('> changeSort', async () => {
        await actionsOrder(changeSort('editions'), [
            'homeSearch/changeSort/pending',
            'homeSearch/setSort',
            'homeSearch/searchBooks/pending',
            'homeSearch/searchBooks/fulfilled',
            'homeSearch/changeSort/fulfilled',
        ])
    })
    it('> changePage', async () => {
        await actionsOrder(changePage(1), [
            'homeSearch/changePage/pending',
            'homeSearch/setPage',
            'homeSearch/searchBooks/pending',
            'homeSearch/searchBooks/fulfilled',
            'homeSearch/changePage/fulfilled',
        ])
    })
})
