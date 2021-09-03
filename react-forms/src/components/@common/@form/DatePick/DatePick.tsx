import React from 'react'
import classnames from '../../../../utils/classnames'
import s from './DatePick.module.scss'

const cx = classnames.bind(s)

type IDatePick = {
    id: string | number
    label?: string
    error?: string | null
} & React.HTMLProps<HTMLInputElement>

const DatePick = React.forwardRef<HTMLInputElement, IDatePick>(
    function DatePick(props, ref) {
        const { id, className, label, error, ...restProps } = props
        return (
            <div className={cx('DatePick', className)}>
                <div className={cx('labelGroup')}>
                    <label htmlFor={id}>
                        {label && <span className={cx('label')}>{label}</span>}
                    </label>
                    <label htmlFor={id}>
                        {error && <span className={cx('error')}>{error}</span>}
                    </label>
                </div>
                <input
                    type="date"
                    id={id}
                    className={cx({ invalid: Boolean(error) })}
                    ref={ref}
                    {...restProps}
                />
            </div>
        )
    }
)

export default DatePick
