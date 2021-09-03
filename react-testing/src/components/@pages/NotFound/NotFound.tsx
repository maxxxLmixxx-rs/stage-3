import s from './NotFound.module.scss'
import classnames from '../../../utils/classnames'
import Svg404 from './404.svg'

const cx = classnames.bind(s)

const NotFound: React.FC = () => {
    return (
        <div className={cx('NotFound')}>
            <div className={cx('image')}>
                <Svg404 />
            </div>
        </div>
    )
}

export default NotFound
