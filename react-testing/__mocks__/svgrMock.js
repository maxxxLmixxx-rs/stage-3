import React from 'react'

const SvgrMock = React.forwardRef((props, ref) => {
    return React.createElement('span', { ref, ...props })
})
export default SvgrMock
