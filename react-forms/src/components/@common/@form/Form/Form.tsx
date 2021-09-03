import React from 'react'
import classnames from '../../../../utils/classnames'
import s from './Form.module.scss'

const cx = classnames.bind(s)

const Form = React.forwardRef<
    HTMLFormElement,
    React.HTMLProps<HTMLFormElement>
>(function Form(props, ref) {
    const { children, className, ...restProps } = props
    return (
        <form
            noValidate
            className={cx('Form', className)}
            ref={ref}
            {...restProps}
        >
            {children}
        </form>
    )
})

export const OneLine: React.FC = (props) => {
    const { children } = props
    return <div className={cx('OneLine')}>{children}</div>
}

export default Form
