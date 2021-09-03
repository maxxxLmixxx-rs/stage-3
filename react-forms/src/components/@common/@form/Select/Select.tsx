import React from 'react'
import classnames from '../../../../utils/classnames'
import s from './Select.module.scss'

const cx = classnames.bind(s)

type ISelect = {
    label?: string
} & React.HTMLProps<HTMLSelectElement>

const Select = React.forwardRef<HTMLSelectElement, ISelect>(
    //
    function Select(props, ref) {
        const { className, label, children, value, ...restProps } = props
        return (
            <div className={cx('Select', className)}>
                {label && <span>{label}</span>}
                <select ref={ref} value={value} {...restProps}>
                    {children}
                </select>
                <span className={cx('icon')} />
            </div>
        )
    }
)

export default Select
