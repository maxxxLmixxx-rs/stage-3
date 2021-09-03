/* eslint-disable no-else-return */

type PaginationArrayParams = {
    maxPages: number
    page: number
    visible: number
    left: number
    right: number
}

const paginationArray = (params: PaginationArrayParams): (null | number)[] => {
    const { maxPages, page, left, visible, right } = params
    const pageArray = Array.from({ length: maxPages }).map((_, ix) => ix + 1)

    const conditions = {
        maxPagesLowerVisible: maxPages <= visible + 1,
        onlyRightHidden: page < visible + left,
        onlyLeftHidden: page > maxPages - (visible - 1) - right,
        get leftAndRightHidden(): boolean {
            return !(
                this.maxPagesLowerVisible &&
                this.onlyRightHidden &&
                this.onlyLeftHidden
            )
        },
    }

    const tail = [null, ...pageArray.slice(-right)]
    const head = [...pageArray.slice(0, left), null]

    if (conditions.maxPagesLowerVisible) {
        return pageArray.slice(0, maxPages)
    } else {
        if (conditions.onlyRightHidden) {
            return [...pageArray.slice(0, visible + left + 1), ...tail]
        }
        if (conditions.onlyLeftHidden) {
            return [...head, ...pageArray.slice(-visible - right - 1)]
        }
        if (conditions.leftAndRightHidden) {
            return [
                ...head,
                ...pageArray.slice(page - visible / 2, page + visible / 2),
                ...tail,
            ]
        }
        return [null]
    }
}

export default paginationArray
