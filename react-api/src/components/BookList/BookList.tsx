import classnames from '../../utils/classnames'
import s from './BookList.module.scss'
import { BookTitle } from '../../API/openLibrary.org/search'
import Loader from '../Loader/Loader'
import NoResultSvg from './no-result.svg'
import Pagination from '../Pagination/Pagination'

const cx = classnames.bind(s)

type IBookList = {
    showPagination?: boolean
    isFetching?: boolean
    books: BookTitle[]
    maxPages: null | number
    page: number
    setPage: (page: number) => void
}

const BookList: React.FC<IBookList> = (props) => {
    const { showPagination = false, isFetching = false } = props
    const { maxPages, page, setPage, books } = props

    const Books = books.map(({ title, author }, ix) => {
        const query = `${title} by ${author}`
        return (
            <div key={ix} className={cx('Book')}>
                <a
                    title={query}
                    className={cx('titleLink')}
                    href={`https://www.google.com/search?q=${query}`}
                >
                    <span className={cx('title')}>{title}</span>
                    <span className={cx('author')}>{author}</span>
                </a>
            </div>
        )
    })

    return (
        <div className={cx('BookList')}>
            <div className={cx('main')}>
                {(() => {
                    if (isFetching) {
                        return <Loader show={isFetching} fullHeight />
                    }
                    if (books.length) {
                        return <div className={cx('list')}>{Books}</div>
                    }
                    return <NoResultSvg style={{ opacity: 0.55 }} />
                })()}
            </div>
            <div className={cx('footer')}>
                {showPagination && !!books.length && !!maxPages && (
                    <Pagination
                        page={page}
                        maxPages={maxPages}
                        onPageChange={setPage}
                        visibleCenter={3}
                    />
                )}
            </div>
        </div>
    )
}

export default BookList
