import paginationArray from '../components/@common/Pagination/paginationArray'

describe('1 ... 5 ... 1', () => {
    const initial = {
        visible: 5,
        left: 1,
        right: 1,
        maxPages: 100,
    }

    it('only right hidden: page 1', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, null, 100]
        expect(paginationArray({ ...initial, page: 1 })).toEqual(array)
    })
    it('only left hidden: page 100', () => {
        const array = [1, null, 94, 95, 96, 97, 98, 99, 100]
        expect(paginationArray({ ...initial, page: 100 })).toEqual(array)
    })
    it('left and right hidden: page 50', () => {
        const array = [1, null, 48, 49, 50, 51, 52, null, 100]
        expect(paginationArray({ ...initial, page: 50 })).toEqual(array)
    })
})
