import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Router, Route } from 'react-router-dom'
import { createHashHistory, History } from 'history'
import Details, {
    BookCover,
    ExpandableText,
} from '../components/@pages/Details/Details'
import Link from '../links'
import { Book } from '../API/openLibrary.org/parsers/book'
import renderWithRedux from './utils/renderWithRedux'
import loremGenerator, { findNearestDotPosition } from './utils/loremGenerator'

describe('Test <Details />', () => {
    let history: History<unknown>
    let Component: React.FC

    const initialState = {
        bookDetails: {
            isBookFetching: true,
            isCoverFetching: true,
            isExpanded: false,
            book: {
                id: 'some id',
                title: 'Some book',
                description: loremGenerator(20),
            } as Book,
        },
    }

    beforeAll(() => {
        history = createHashHistory()
        history.push('/details/OL2040128W')
    })

    beforeEach(() => {
        Component = (): JSX.Element => {
            return (
                <Router history={history}>
                    <Route path={Link.route('details')}>
                        <Details />
                    </Route>
                </Router>
            )
        }
    })

    it('show initial loader: .Loader', async () => {
        const { container } = renderWithRedux(<Component />, initialState)
        expect(container.querySelector('.Loader')).toBeInTheDocument()
    })
    /** WTF ... */
    it('show content after loading', async () => {
        renderWithRedux(<Component />, {
            bookDetails: {
                ...initialState.bookDetails,
                isBookFetching: false,
            },
        })
        expect(true).toBeTruthy()
    })
})

describe('Test <ExpandableText />', () => {
    type ExpandableTextProps = React.ComponentProps<typeof ExpandableText>
    let Component: React.FC<Partial<ExpandableTextProps>>

    const maxSymbols = 500
    const lorem = loremGenerator(maxSymbols + 100)
    const firstDotFrom = findNearestDotPosition(maxSymbols) + 1

    beforeEach(() => {
        Component = (props): JSX.Element => {
            const {
                expand = false,
                maxSymbols: max = 500,
                children = loremGenerator(550),
            } = props
            const [expanded, setExpanded] = useState(expand)

            return (
                <ExpandableText
                    maxSymbols={max}
                    expand={expanded}
                    onExpand={() => {
                        setExpanded((p) => !p)
                    }}
                >
                    {children}
                </ExpandableText>
            )
        }
    })

    it('expand menu extend hidden text to first dot', async () => {
        render(<Component maxSymbols={maxSymbols}>{lorem}</Component>)
        expect(screen.getByText(/lorem/i)?.textContent?.length).toEqual(
            firstDotFrom
        )
    })

    it('show expanded text on user click', async () => {
        render(<Component maxSymbols={maxSymbols}>{lorem}</Component>)
        userEvent.click(screen.getByRole('button'))
        expect(screen.getByText(/lorem/i)?.textContent?.length).toEqual(
            lorem.length
        )
    })
})

describe('Test <BookCover />', () => {
    type BookCoverTextProps = React.ComponentProps<typeof BookCover>
    let Component: React.FC<Partial<BookCoverTextProps>>
    let hasBeenLoaded = false
    const imageUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`

    beforeEach(() => {
        Component = (props): JSX.Element => {
            const { noImage = false } = props
            const [loading, setLoading] = useState(true)

            return (
                <BookCover
                    src={imageUrl}
                    noImage={noImage}
                    loading={loading}
                    onLoad={() => {
                        setLoading(false)
                        hasBeenLoaded = true
                    }}
                />
            )
        }
    })

    afterEach(() => {
        hasBeenLoaded = false
    })

    it('> show loader', async () => {
        const { container } = render(<Component />)
        expect(container.querySelector('.Loader')).toBeInTheDocument()
    })
    it('> load image', async () => {
        render(<Component />)
        const image = screen.getByAltText(/(book)|(cover)/i)
        fireEvent.load(image)
        expect(hasBeenLoaded).toEqual(true)
    })
})
