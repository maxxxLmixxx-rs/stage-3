import { configureStore, Middleware } from '@reduxjs/toolkit'
import { reducer } from '../../store'

export const listOfActions = (): [string[], Middleware] => {
    const actions = [] as string[]
    const middleware: Middleware = () => (next) => (action) => {
        actions.push(action.type)
        return next(action)
    }
    return [actions, middleware]
}

const actionsOrder = async <T,>(
    action: T,
    expectedActions: string[]
): Promise<void> => {
    const [list, listOfActionsMw] = listOfActions()
    const store = configureStore({
        reducer,
        middleware: (defaultMw) => {
            return [...defaultMw(), listOfActionsMw]
        },
    })
    await store.dispatch(action as any)
    expect(list).toMatchObject(expectedActions)
}

export default actionsOrder
