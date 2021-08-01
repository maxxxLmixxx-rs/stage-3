import { useEffect, useRef, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import s from './Details.module.scss'
import classnames from '../../../utils/classnames'
import OpenLibrary from '../../../API/openLibrary.org'
import useMultipleFetching from '../../../hooks/useMultipleFetching'
import Loader from '../../@common/Loader/Loader'
import { Book } from '../../../API/openLibrary.org/parsers/book'
import BookSvg from './book.svg'

const cx = classnames.bind(s)

type BookCoverProps = {
    src: string
    noImage?: boolean
    loading?: boolean
    onLoad?: (e: Event) => void
}

const BookCover: React.FC<BookCoverProps> = (props) => {
    const { src, loading = false, noImage = false, onLoad = () => null } = props

    const onLoadRef = useRef<typeof onLoad>(onLoad)
    onLoadRef.current = onLoad

    useEffect(() => {
        if (!src) return
        const image = new Image()
        image.src = src
        image.addEventListener('load', onLoadRef.current, { once: true })
    }, [src])

    const ImageCover = (
        <img className={cx('imageCover')} src={src} alt="book cover" />
    )
    const NoImage = (
        <div className={cx('placeholder')}>
            <BookSvg />
            <span>No image</span>
        </div>
    )

    return (
        <div className={cx('bookCover', { noImage })}>
            {(() => {
                if (noImage) return NoImage
                if (loading) return <Loader />
                return ImageCover
            })()}
        </div>
    )
}

type ExpandableProps = {
    maxSymbols?: number
    expand?: boolean
    children: string
    onExpand?: (is: boolean) => void
}

const Expandable: React.FC<ExpandableProps> = (props) => {
    const {
        onExpand = () => null,
        expand = false,
        maxSymbols = 500,
        children,
    } = props
    const firstDot = children.indexOf('.', maxSymbols) + 1
    const trimmed = children.slice(0, firstDot)
    const isInteractive = children.length > firstDot

    const Interactive = (): JSX.Element => {
        return (
            <>
                <p className={cx('content')}>{expand ? children : trimmed}</p>
                <button
                    className={cx('button')}
                    type="button"
                    onClick={() => onExpand(expand)}
                >
                    ...
                </button>
            </>
        )
    }

    return (
        <div className={cx('Expandable')}>
            {isInteractive ? Interactive() : children}
        </div>
    )
}

const Conditional: React.FC<{ if: unknown }> = (props) => {
    const { if: condition, children } = props
    return condition ? <>{children}</> : null
}

const Details: React.FC = () => {
    const { params } = useRouteMatch<{ bookId: string }>()
    const { bookId } = params
    const [book, setBook] = useState<Book>()
    const [expand, setExpand] = useState(false)
    const [isFetching, setFetching] = useMultipleFetching({
        book: true,
        image: true,
    })
    const coverLink = (book?.coverLinks && book.coverLinks[0]) || ''

    useEffect(() => {
        OpenLibrary.book(bookId).then((data) => {
            setFetching('book')(false)
            setBook(data)
        })
    }, [bookId, setFetching])

    return (
        <div className={cx('Details', { loader: isFetching.book })}>
            <Loader show={isFetching.book} />
            {!isFetching.book && (
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <BookCover
                            src={coverLink}
                            loading={isFetching.image}
                            noImage={book && !coverLink}
                            onLoad={() => setFetching('image')(false)}
                        />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('bookAbout')}>
                            <div className={cx('head')}>
                                <h2 className={cx('title')}>{book?.title}</h2>
                                <Conditional if={book?.authors}>
                                    <h3 className={cx('authors')}>
                                        {book?.authors.join(', ')}
                                    </h3>
                                </Conditional>
                                <Conditional if={book?.publish}>
                                    <time className={cx('publish')}>
                                        {book?.publish}
                                    </time>
                                </Conditional>
                            </div>
                            <div className={cx('body')}>
                                <Conditional if={book?.description}>
                                    <Expandable
                                        onExpand={() => setExpand((p) => !p)}
                                        expand={expand}
                                    >
                                        {book?.description || ''}
                                    </Expandable>
                                </Conditional>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Details
