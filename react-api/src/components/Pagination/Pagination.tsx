import React, { useMemo } from 'react'
import s from './Pagination.module.scss'
import classnames from '../../utils/classnames'
import paginationArray from './paginationArray'

const cx = classnames.bind(s)

type PaginationProps = {
    page: number
    maxPages: number
    visibleCenter?: number
    visibleLeft?: number
    visibleRight?: number
    onPageChange?: (page: number) => void
}

type PageProps = {
    current?: boolean
    onClick?: () => void
}

const Page: React.FC<PageProps> = (props) => {
    const { children, current = false, onClick = () => null } = props
    return (
        <button
            type="button"
            disabled={!children}
            onClick={onClick}
            className={cx('pageNumber', { current, decoration: !children })}
        >
            {children || '...'}
        </button>
    )
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { maxPages, page, onPageChange = () => '' } = props
    const { visibleCenter = 5, visibleLeft = 1, visibleRight = 1 } = props
    const pagination = useMemo(
        () =>
            paginationArray({
                maxPages,
                page,
                visible: visibleCenter,
                left: visibleLeft,
                right: visibleRight,
            }),
        [maxPages, page, visibleCenter, visibleLeft, visibleRight]
    )

    const Arrow = (direction: 'left' | 'right'): JSX.Element => {
        const onClick = (): void => {
            onPageChange(direction === 'left' ? page - 1 : page + 1)
        }
        const idDisabled = (): boolean => {
            return direction === 'left' ? page <= 1 : page >= maxPages
        }
        return (
            <button
                className={cx('pageNumber')}
                type="button"
                disabled={idDisabled()}
                onClick={onClick}
            >
                {direction === 'left' ? '<' : '>'}
            </button>
        )
    }

    return (
        <div className={cx('Pagination')}>
            {Arrow('left')}
            {pagination.map((pageNum, ix) => {
                const onClick = (): void => {
                    if (pageNum !== null) onPageChange(pageNum)
                }
                return (
                    <Page key={ix} current={page === pageNum} onClick={onClick}>
                        {pageNum}
                    </Page>
                )
            })}
            {Arrow('right')}
        </div>
    )
}

export default Pagination
