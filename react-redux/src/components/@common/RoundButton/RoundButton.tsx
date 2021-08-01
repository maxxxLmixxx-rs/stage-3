/* eslint-disable react/button-has-type */

import s from './RoundButton.module.scss'
import classnames from '../../../utils/classnames'

const cx = classnames.bind(s)

type RoundButtonProps = {
    active?: boolean
} & React.HTMLProps<HTMLButtonElement>
type ButtonType = 'button' | 'submit' | 'reset'

const RoundButton: React.FC<RoundButtonProps> = (props) => {
    const { children, active = false, type = 'button', ...rest } = props
    return (
        <button
            type={type as ButtonType}
            className={cx('RoundButton', { active })}
            {...rest}
        >
            {children}
        </button>
    )
}

export default RoundButton
