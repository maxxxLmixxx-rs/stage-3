import { RefObject, useEffect, useRef } from 'react'

type UseOuterClickCallback = (e: MouseEvent) => void

const useOuterClick = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: UseOuterClickCallback
): RefObject<T> => {
    const callbackRef = useRef<UseOuterClickCallback>()
    callbackRef.current = callback

    useEffect(() => {
        const handleClick = (e: MouseEvent): void => {
            if (!callbackRef.current) return
            if (!ref.current) return
            if (ref.current.contains(e.target as Node)) return
            callbackRef.current(e)
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [callbackRef, ref])

    return ref
}

export default useOuterClick
