import { NavLink } from 'react-router-dom'
import classnames from '../../../../utils/classnames'
import s from './BookList.module.scss'
import Loader from '../../../@common/Loader/Loader'
import NoResultSvg from './no-result.svg'
import Pagination from '../../../@common/Pagination/Pagination'
import Link from '../../../../links'
import { BookTitle } from '../../../../API/openLibrary.org/parsers/search'

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

    const Books = books.map(({ id, title, author }) => {
        const linkPath = `${Link.path('details')}/${id}`
        return (
            <div key={id} className={cx('Book')}>
                <NavLink to={linkPath} className={cx('titleLink')}>
                    <span className={cx('title')}>{title}</span>
                    <span className={cx('author')}>{author}</span>
                </NavLink>
            </div>
        )
    })

    return (
        <div className={cx('BookList')}>
            <div className={cx('main')}>
                {(() => {
                    if (isFetching) {
                        return <Loader fullHeight />
                    }
                    if (books.length) {
                        return <div className={cx('list')}>{Books}</div>
                    }
                    return (
                        <div className={cx('NoResult')}>
                            <NoResultSvg style={{ opacity: 0.55 }} />
                        </div>
                    )
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
