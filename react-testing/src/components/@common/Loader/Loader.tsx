import { useState } from 'react'
import s from './Loader.module.scss'
import l from './ExternalLoader.scss'
import classnames from '../../../utils/classnames'

const cx = classnames.bind({ ...s, ...l })

type LoaderProps = {
    fullHeight?: boolean
    show?: boolean
    delay?: number
}

const useDelay = (delay: number): boolean => {
    const [wait, setWait] = useState(true)
    setTimeout(() => setWait(false), delay)
    return wait
}

const Loader: React.FC<LoaderProps> = (props) => {
    const { delay = 0, show = true, fullHeight = false } = props
    const wait = useDelay(delay)
    if (!show || wait) return null
    return (
        <div className={cx('Loader', { fullHeight })}>
            <div className={cx('ExternalLoader')} />
        </div>
    )
}

export default Loader
