import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { reducer, RootState } from '../../store'

const renderWithRedux = (
    ui: ReactElement,
    initialState = {} as RootState | Partial<RootState>
): {
    store: typeof store
} & typeof utils => {
    const store = configureStore({ reducer, preloadedState: initialState })
    const utils = render(<Provider store={store}>{ui}</Provider>)
    return { ...utils, store }
}

export default renderWithRedux
