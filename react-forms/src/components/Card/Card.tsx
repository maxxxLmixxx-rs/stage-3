import s from './Card.module.scss'
import classnames from '../../utils/classnames'
import AvatarSvg from './avatar.svg'

const cx = classnames.bind(s)

type ValueOf<T> = T[keyof T]

type CardProps = {
    name: string
    surname: string
    date: string
    country: string
    male: boolean
}

export type ICard = CardProps

const Card: React.FC<CardProps> = (props) => {
    const { name, surname, date, country, male } = props

    const Field = (label: string, value: ValueOf<CardProps>): JSX.Element => {
        return (
            <div className={cx('field')}>
                <span className={cx('label')}>{label}: </span>
                <span className={cx('value')}>{value}</span>
            </div>
        )
    }

    return (
        <div className={cx('Card')}>
            <div>
                <div className={cx('avatar')}>
                    <AvatarSvg />
                </div>
            </div>
            <div>
                <div className={cx('name')}>
                    {surname} {name}
                </div>
                <div className={cx('info')}>
                    {Field('Birth date', date)}
                    {Field('Country', country)}
                    {Field('Male', male === true ? 'Man' : 'Women')}
                </div>
            </div>
        </div>
    )
}

export default Card
