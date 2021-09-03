import { configureStore } from '@reduxjs/toolkit'
import homeSearch from './homeSearchSlice'
import bookDetails from './bookDetailsSlice'

const isDevelopment = process.env.NODE_ENV === 'development'
const store = configureStore({
    reducer: {
        homeSearch,
        bookDetails,
    },
    devTools: isDevelopment,
})

export type RootState = ReturnType<typeof store.getState>
export default store
