import s from './Loader.module.scss'
import l from './ExternalLoader.scss'
import classnames from '../../utils/classnames'

const cx = classnames.bind({ ...s, ...l })

type LoaderProps = {
    fullHeight?: boolean
    show?: boolean
}

const ExternalLoader: React.FC = () => {
    return <div className={cx('ExternalLoader')} />
}

const Loader: React.FC<LoaderProps> = (props) => {
    const { show = true, fullHeight = false } = props
    if (!show) return null
    return (
        <div className={cx('Loader', { fullHeight })}>
            <ExternalLoader />
        </div>
    )
}

export default Loader
