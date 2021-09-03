import s from './Loader.module.scss'
import l from './ExternalLoader.module.scss'
import classnames from '../../../utils/classnames'

const cx = classnames.bind(Object.assign(s, l))

type LoaderProps = {
    fullHeight?: boolean
    show?: boolean
}

const Loader: React.FC<LoaderProps> = (props) => {
    const { show = true, fullHeight = false } = props
    if (!show) return null
    return (
        <div className={cx('Loader', { fullHeight })}>
            <div className={cx('ExternalLoader')} />
        </div>
    )
}

export default Loader
