import React from 'react'
import classnames from '../../../../utils/classnames'
import s from './Checkbox.module.scss'

const cx = classnames.bind(s)

type ICheckbox = {
    error?: boolean
    label?: string
} & React.HTMLProps<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, ICheckbox>(
    function Checkbox(props, ref) {
        const { className, label, error, ...restProps } = props
        return (
            <label className={cx('Checkbox', className)}>
                <input
                    type="checkbox"
                    className={cx({ error: Boolean(error) })}
                    ref={ref}
                    {...restProps}
                />
                {label && <span>{label}</span>}
            </label>
        )
    }
)

export default Checkbox
