import { NavLink } from 'react-router-dom'
import s from './Header.module.scss'
import classnames from '../../../utils/classnames'
import Link from '../../../links'

const cx = classnames.bind(s)

const Li: React.FC<{ href: string }> = (props) => {
    const { href, children } = props
    return (
        <li className={cx('item')}>
            <NavLink
                className={cx('link')}
                to={href}
                activeClassName={cx('active')}
                exact
            >
                {children}
            </NavLink>
        </li>
    )
}

const Header: React.FC = () => {
    const linksArray = [
        { href: Link.navLink('home'), title: 'Home' },
        { href: Link.navLink('about'), title: 'About' },
    ]

    return (
        <nav className={cx('Header')}>
            <ul className={cx('list')}>
                {linksArray.map(({ href, title }, ix) => (
                    <Li key={ix} href={href}>
                        {title}
                    </Li>
                ))}
            </ul>
        </nav>
    )
}

export default Header
