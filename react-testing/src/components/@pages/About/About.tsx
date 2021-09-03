import s from './About.module.scss'
import classnames from '../../../utils/classnames'
import AboutSvg from './about.svg'

const cx = classnames.bind(s)

const About: React.FC = () => {
    return (
        <div className={cx('About')}>
            <div className={cx('image')}>
                <AboutSvg />
            </div>
        </div>
    )
}

export default About
