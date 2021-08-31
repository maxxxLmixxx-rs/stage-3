/* eslint-disable no-param-reassign, @typescript-eslint/no-use-before-define */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import OpenLibrary from '../API/openLibrary.org'
import { Book } from '../API/openLibrary.org/parsers/book'

export const fetchBookDetails = createAsyncThunk(
    'homeSearch/fetchBookDetails',
    async (bookId: string, { dispatch }) => {
        dispatch(toggleBookFetching(true))
        OpenLibrary.book(bookId).then((data) => {
            dispatch(setBookDetails(data))
            dispatch(toggleBookFetching(false))
        })
    }
)

const bookDetailsSlice = createSlice({
    name: 'bookDetails',
    initialState: {
        isCoverFetching: true,
        isBookFetching: true,
        isExpanded: false,
        book: {} as Book,
    },
    reducers: {
        setBookDetails: (state, action: PayloadAction<Book>) => {
            state.book = action.payload
        },
        toggleBookFetching: (
            state,
            action: PayloadAction<boolean | undefined>
        ) => {
            state.isBookFetching = action.payload
                ? action.payload
                : !state.isBookFetching
        },
        toggleCoverFetching: (
            state,
            action: PayloadAction<boolean | undefined>
        ) => {
            state.isCoverFetching = action.payload
                ? action.payload
                : !state.isCoverFetching
        },
        toggleExpand: (state, action: PayloadAction<boolean | undefined>) => {
            state.isExpanded = action.payload
                ? action.payload
                : !state.isExpanded
        },
    },
})

const { setBookDetails, toggleBookFetching } = bookDetailsSlice.actions
export const { toggleCoverFetching, toggleExpand } = bookDetailsSlice.actions

export default bookDetailsSlice.reducer
