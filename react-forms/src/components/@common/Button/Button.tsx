import React from 'react'
import s from './Button.module.scss'
import classnames from '../../../utils/classnames'

const cx = classnames.bind(s)

type IButton = {
    disabled?: boolean
    notAllow?: boolean
} & React.HTMLProps<HTMLButtonElement>
type ButtonType = 'button' | 'submit' | 'reset' | undefined

const Button = React.forwardRef<HTMLButtonElement, IButton>(
    /* eslint-disable react/button-has-type */
    function Button(props, ref) {
        const {
            children = '',
            notAllow = false,
            disabled = false,
            className = '',
            type = 'button',
            ...rest
        } = props
        const buttonType = type as ButtonType
        return (
            <button
                disabled={disabled}
                type={buttonType}
                className={cx('Button', { notAllow }, className)}
                ref={ref}
                {...rest}
            >
                {children}
            </button>
        )
    }
)

export default Button
