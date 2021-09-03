import { render, waitFor } from '@testing-library/react'
import { createHashHistory } from 'history'
import App from '../App'

type CheckRoute = (r: string, eQ: string) => Promise<void>

const checkRoute: CheckRoute = async (route, elementQuery) => {
    const history = createHashHistory()
    history.push(route)
    const { container } = render(<App />)

    await waitFor(() => container.querySelector(elementQuery))
    expect(container.querySelector(elementQuery)).toBeInTheDocument()
}

describe('Route checking', () => {
    it('should route to <Home /> page by default', async () => {
        await checkRoute('/some-random-path', '.NotFound')
        await checkRoute('/', '.Home')
        await checkRoute('/home', '.Home')
    })
    it('should route to <About /> page', async () => {
        checkRoute('/about', '.About')
    })
    it('should route to <NotFound /> page', async () => {
        checkRoute('/some-random-route', '.NotFound')
    })
    it('should route to <Details /> page', async () => {
        checkRoute('/details/OL2040128W', '.Details')
    })
})
