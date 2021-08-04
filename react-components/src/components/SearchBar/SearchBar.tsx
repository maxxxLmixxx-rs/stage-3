import s from './SearchBar.module.scss'

const SearchBar: React.FC = () => {
    return (
        <div className={s.SearchBar}>
            <label htmlFor="search">
                Search:
                <input
                    id="search"
                    type="text"
                    className={s.input}
                    placeholder="Uncontrolled input"
                />
            </label>
        </div>
    )
}

export default SearchBar
