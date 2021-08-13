import React from 'react'
import classnames from '../../../../utils/classnames'
import s from './TextField.module.scss'

const cx = classnames.bind(s)

type ITextField = {
    id: string | number
    label?: string
    error?: string | null
} & React.HTMLProps<HTMLInputElement>

const TextField = React.forwardRef<HTMLInputElement, ITextField>(
    function TextField(props, ref) {
        const { id, className, label, error, ...restProps } = props
        return (
            <div className={cx('TextField', className)}>
                <div className={cx('labelGroup')}>
                    <label htmlFor={id}>
                        {label && <span className={cx('label')}>{label}</span>}
                    </label>
                    <label htmlFor={id}>
                        {error && <span className={cx('error')}>{error}</span>}
                    </label>
                </div>
                <input
                    type="text"
                    className={cx({ invalid: Boolean(error) })}
                    id={id}
                    ref={ref}
                    {...restProps}
                />
            </div>
        )
    }
)

export default TextField
