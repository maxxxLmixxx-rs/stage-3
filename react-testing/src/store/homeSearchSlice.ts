/* eslint-disable no-param-reassign, @typescript-eslint/no-use-before-define */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import OpenLibrary, { SortParams } from '../API/openLibrary.org'
import { BookTitle } from '../API/openLibrary.org/parsers/search'

type SearchObject = {
    limit: number
    page: number
    maxPages: null | number
    sort: SortParams
    value: string
}

const searchBooks = createAsyncThunk(
    'homeSearch/searchBooks',
    async (value: string, { dispatch, getState }) => {
        if (value) {
            const { homeSearch } = getState() as RootState
            const { limit, page, sort } = homeSearch.search
            const searchParams = { value, limit, page, sort }
            dispatch(toggleIsFetching(true))
            OpenLibrary.abortPrevious()
                .search(searchParams)
                .then(({ maxBooks, books }) => {
                    dispatch(setMaxPages(Math.floor(maxBooks / limit) - 1))
                    dispatch(setBookTitles(books))
                    dispatch(toggleIsFetching(false))
                })
                .catch(OpenLibrary.skipAbort(console.error))
        }
    }
)

export const changeSearchValue = createAsyncThunk(
    'homeSearch/searchBooks',
    (value: string, { dispatch }) => {
        dispatch(setSearchValue(value))
        dispatch(searchBooks(value))
    }
)

export const changeSort = createAsyncThunk(
    'homeSearch/changeSort',
    (sort: SortParams, { dispatch, getState }) => {
        const { homeSearch } = getState() as RootState
        const {
            search: { value },
        } = homeSearch
        dispatch(setSort(sort))
        dispatch(searchBooks(value))
    }
)

export const changePage = createAsyncThunk(
    'homeSearch/changePage',
    (page: number, { dispatch, getState }) => {
        const { homeSearch } = getState() as RootState
        const {
            search: { value },
        } = homeSearch
        dispatch(setPage(page))
        dispatch(searchBooks(value))
    }
)

const homeSearchSlice = createSlice({
    name: 'homeSearch',
    initialState: {
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
    reducers: {
        setMaxPages(state, action: PayloadAction<number | null>) {
            state.search.maxPages = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.search.page = action.payload
        },
        setSort(state, action: PayloadAction<SortParams>) {
            state.search.page = 1
            state.search.sort = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.search.value = action.payload
        },
        setBookTitles(state, action: PayloadAction<BookTitle[]>) {
            state.bookTitles = action.payload
        },
        toggleIsFetching(state, action: PayloadAction<boolean | undefined>) {
            state.isFetching = action.payload
                ? action.payload
                : !state.isFetching
        },
    },
})

const {
    toggleIsFetching,
    setSearchValue,
    setMaxPages,
    setSort,
    setPage,
    setBookTitles,
} = homeSearchSlice.actions
export default homeSearchSlice.reducer
