import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import SmartSearch from '../components/@pages/Home/SmartSearch/SmartSearch'

describe('Smart search', () => {
    const ExpandClassName = '.expanded'
    let Component: React.FC

    beforeEach(() => {
        Component = (): JSX.Element => {
            const [value, setValue] = useState('')
            return (
                <div data-testid="container">
                    <SmartSearch
                        placeholder="Search"
                        value={value}
                        onChange={({ currentTarget: { value: v } }) => {
                            setValue(v)
                        }}
                        onExpand={<div />}
                    />
                </div>
            )
        }
    })

    it('.expanded if value exists', async () => {
        const { container } = render(<Component />)
        const input = screen.getByRole('textbox')

        expect(container.querySelector(ExpandClassName)).not.toBeInTheDocument()
        userEvent.type(input, 'Javascript')
        expect(container.querySelector(ExpandClassName)).toBeInTheDocument()
    })
    it('no .expanded if no value', async () => {
        const { container } = render(<Component />)
        const input = screen.getByRole('textbox')

        userEvent.type(input, 'Javascript')
        expect(container.querySelector(ExpandClassName)).toBeInTheDocument()

        userEvent.clear(input)
        expect(container.querySelector(ExpandClassName)).not.toBeInTheDocument()
    })
    it('no .expanded if focus out', async () => {
        const { container } = render(<Component />)
        const input = screen.getByRole('textbox')

        userEvent.type(input, 'Javascript')
        expect(container.querySelector(ExpandClassName)).toBeInTheDocument()

        userEvent.click(screen.getByTestId('container'))
        expect(container.querySelector(ExpandClassName)).not.toBeInTheDocument()
    })
})
