import { ReactEventHandler, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import s from './Details.module.scss'
import classnames from '../../../utils/classnames'
import Loader from '../../@common/Loader/Loader'
import BookSvg from './book.svg'
import { RootState } from '../../../store'
import {
    fetchBookDetails,
    toggleCoverFetching,
    toggleExpand,
} from '../../../store/bookDetailsSlice'

const cx = classnames.bind(s)

type BookCoverProps = {
    src: string
    noImage?: boolean
    loading?: boolean
    onLoad?: ReactEventHandler<HTMLImageElement>
}

export const BookCover: React.FC<BookCoverProps> = (props) => {
    const { src, loading = false, noImage = false, onLoad = () => null } = props

    const ImageCover = (
        <img
            className={cx('imageCover')}
            style={{ display: loading ? 'none' : 'initial' }}
            src={src}
            onLoad={onLoad}
            alt="book cover"
        />
    )
    const NoImage = (
        <div className={cx('placeholder')}>
            <BookSvg />
            <span>No image</span>
        </div>
    )
    const LoadingState = (
        <>
            {ImageCover}
            <Loader />
        </>
    )

    return (
        <div className={cx('bookCover', { noImage })}>
            {(() => {
                if (noImage) return NoImage
                if (loading) return LoadingState
                return ImageCover
            })()}
        </div>
    )
}

type ExpandableTextProps = {
    maxSymbols?: number
    expand?: boolean
    children: string
    onExpand?: (will: boolean) => void
}

export const ExpandableText: React.FC<ExpandableTextProps> = (props) => {
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
                    onClick={() => onExpand(!expand)}
                >
                    ...
                </button>
            </>
        )
    }

    return (
        <div className={cx('ExpandableText')}>
            {isInteractive ? Interactive() : children}
        </div>
    )
}

const Conditional: React.FC<{ if: unknown }> = (props) => {
    const { if: condition, children } = props
    return condition ? <>{children}</> : null
}

const Details: React.FC = () => {
    const dispatch = useDispatch()
    const { params } = useRouteMatch<{ bookId: string }>()
    const { bookId } = params
    const bookDetails = useSelector((state: RootState) => state.bookDetails)
    const { book, isBookFetching, isCoverFetching, isExpanded } = bookDetails
    const coverLink = (book?.coverLinks && book.coverLinks[0]) || ''

    useEffect(() => {
        dispatch(fetchBookDetails(bookId))
    }, [bookId, dispatch])

    return (
        <div className={cx('Details', { loader: isBookFetching })}>
            <Loader show={isBookFetching} />
            {!isBookFetching && (
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <BookCover
                            src={coverLink}
                            loading={isCoverFetching}
                            noImage={book && !coverLink}
                            onLoad={() => dispatch(toggleCoverFetching(false))}
                        />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('bookAbout')}>
                            <div className={cx('head')}>
                                <h2 className={cx('title')}>{book?.title}</h2>
                                <Conditional if={book?.authors}>
                                    <h3 className={cx('authors')}>
                                        {book?.authors?.join(', ')}
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
                                    <ExpandableText
                                        onExpand={() =>
                                            dispatch(toggleExpand())
                                        }
                                        expand={isExpanded}
                                    >
                                        {book?.description || ''}
                                    </ExpandableText>
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
