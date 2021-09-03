import React from 'react'
import classnames from '../../../../utils/classnames'
import s from './Switcher.module.scss'

const cx = classnames.bind(s)

type ISwitcher = {
    right?: string
    left?: string
    active?: boolean
} & React.HTMLProps<HTMLInputElement>

const Switcher = React.forwardRef<HTMLInputElement, ISwitcher>(
    function Switcher(props, ref) {
        const { className, right, left, active = false, ...rest } = props
        return (
            <div className={cx('Switcher', className, { checked: active })}>
                {left && <span>{left}</span>}
                <input type="checkbox" ref={ref} checked={active} {...rest} />
                {right && <span>{right}</span>}
            </div>
        )
    }
)

export default Switcher
