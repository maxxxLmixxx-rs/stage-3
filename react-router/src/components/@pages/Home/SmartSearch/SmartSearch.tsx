/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { forwardRef, ReactNode, useRef, useState } from 'react'
import s from './SmartSearch.module.scss'
import classnames from '../../../../utils/classnames'
import SearchSvg from './search.svg'
import useOuterClick from '../../../../hooks/useOuterClick'
import useFocusOut from '../../../../hooks/useFocusOut'

const cx = classnames.bind(s)

type ISmartSearch = {
    onExpand: ReactNode
    noExpand?: boolean
} & React.HTMLProps<HTMLInputElement>

const SmartSearch = forwardRef<HTMLInputElement, ISmartSearch>((props, ref) => {
    const { value = '', onChange = () => null, ...other } = props
    const { noExpand = false, onExpand, ...rest } = other
    const [expanded, setExpanded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useOuterClick(containerRef, () => setExpanded(false))
    useFocusOut(containerRef, () => setExpanded(false))

    const expand = (): void => {
        if (!noExpand && !expanded && value) setExpanded(true)
    }
    return (
        <div
            ref={containerRef}
            className={cx('SmartSearch', { expanded })}
            onClick={expand}
        >
            <div className={cx('shell')}>
                <div className={cx('searchBar')}>
                    <input
                        value={value}
                        ref={ref}
                        onChange={(e) => {
                            onChange(e)
                            if (!e.target.value) {
                                setExpanded(false)
                            } else {
                                expand()
                            }
                        }}
                        onFocus={expand}
                        {...rest}
                    />
                    <SearchSvg className={cx('magnifier')} />
                </div>
                <div className={cx('extend')}>{onExpand}</div>
            </div>
        </div>
    )
})

export default SmartSearch
