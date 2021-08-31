import { useDispatch, useSelector } from 'react-redux'
import s from './Home.module.scss'
import classnames from '../../../utils/classnames'
import SmartSearch from './SmartSearch/SmartSearch'
import RoundButton from '../../@common/RoundButton/RoundButton'
import BookList from './BookList/BookList'
import { RootState } from '../../../store'
import {
    changeSearchValue,
    changePage,
    changeSort,
} from '../../../store/homeSearchSlice'

const cx = classnames.bind(s)

const Home: React.FC = () => {
    const dispatch = useDispatch()
    const {
        isFetching,
        bookTitles,
        search: { page, sort, maxPages, value: searchValue },
    } = useSelector((state: RootState) => state.homeSearch)

    return (
        <div className={cx('Home')}>
            <div className={cx('Logo')}>
                <img src="./logo.svg" alt="logo" />
                <h1>Find the book</h1>
            </div>
            <div className={cx('Search')}>
                <SmartSearch
                    placeholder="Search"
                    value={searchValue}
                    onChange={({ currentTarget: { value } }) => {
                        dispatch(changeSearchValue(value))
                    }}
                    onExpand={
                        <BookList
                            showPagination={!!searchValue}
                            books={bookTitles}
                            isFetching={isFetching}
                            maxPages={maxPages}
                            page={page}
                            setPage={(p) => dispatch(changePage(p))}
                        />
                    }
                />
                <div className={cx('controls')}>
                    <RoundButton
                        active={sort === 'editions'}
                        onClick={() => dispatch(changeSort('editions'))}
                    >
                        Most Editions
                    </RoundButton>
                    <RoundButton
                        active={sort === 'old'}
                        onClick={() => dispatch(changeSort('old'))}
                    >
                        First Published
                    </RoundButton>
                    <RoundButton
                        active={sort === 'new'}
                        onClick={() => dispatch(changeSort('new'))}
                    >
                        Most Recent
                    </RoundButton>
                </div>
            </div>
        </div>
    )
}

export default Home
