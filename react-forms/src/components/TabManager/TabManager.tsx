import React, { ReactElement, ReactNode } from 'react'
import s from './TabManage.module.scss'
import classnames from '../../utils/classnames'

const cx = classnames.bind(s)

type valueOf<T> = T[keyof T]
type keyOf<T> = keyof T

type TabProps = {
    children: ReactNode
    title: string
    noPadding?: boolean
}

type TabManagerProps = {
    onTabClick: (tabindex: number) => void
    index?: number
    children: ReactElement<TabProps> | ReactElement<TabProps>[]
}

const TabManager = (props: TabManagerProps): JSX.Element => {
    const { index = 0, onTabClick, children: nested } = props

    const children = React.Children.map(nested, (child) => child.props)
    const selector =
        <T extends valueOf<TabProps>[]>(...propNames: keyOf<TabProps>[]) =>
        (child: TabProps): T => {
            return propNames.map((name) => child[name]) as T
        }

    return (
        <div className={cx('TabManager')}>
            <div className={cx('header')}>
                {children
                    .map(selector<[string]>('title'))
                    .map(([title], ix) => {
                        const active = ix === index
                        return (
                            <button
                                className={cx('title', { active })}
                                key={ix}
                                type="button"
                                onClick={() => onTabClick(ix)}
                            >
                                {title}
                            </button>
                        )
                    })}
            </div>
            <div className={cx('body')}>
                <div
                    style={{ transform: `translateX(${-100 * index}%)` }}
                    className={cx('moveGroup')}
                >
                    {children
                        .map<[ReactNode, boolean]>(
                            selector('children', 'noPadding')
                        )
                        .map(([content, noPadding], ix) => (
                            <div
                                key={ix}
                                className={cx({ noPadding })}
                                style={{
                                    visibility:
                                        ix === index ? undefined : 'hidden',
                                }}
                            >
                                {content}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default TabManager
export const Tab: React.FC<TabProps> = () => null
