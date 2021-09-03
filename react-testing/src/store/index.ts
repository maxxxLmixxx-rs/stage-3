import { configureStore } from '@reduxjs/toolkit'
import homeSearch from './homeSearchSlice'
import bookDetails from './bookDetailsSlice'

const isDevelopment = process.env.NODE_ENV === 'development'
export const reducer = {
    homeSearch,
    bookDetails,
}
const store = configureStore({
    reducer,
    devTools: isDevelopment,
})

export type RootState = ReturnType<typeof store.getState>
export default store
