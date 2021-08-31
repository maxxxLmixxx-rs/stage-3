import { RefObject, useEffect, useRef } from 'react'

type UseFocusOutCallback = (e: FocusEvent) => void

const useFocusOut = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: UseFocusOutCallback
): void => {
    const htmlElement = ref.current
    const callbackRef = useRef<UseFocusOutCallback>()
    callbackRef.current = callback

    useEffect(() => {
        const handleFocusout = (e: FocusEvent): void => {
            if (!callbackRef.current) return
            if (!ref.current) return
            if (!e.relatedTarget) return
            if (ref.current.contains(e.relatedTarget as Node)) return
            callbackRef.current(e)
        }
        htmlElement?.addEventListener('focusout', handleFocusout)
        return () => {
            htmlElement?.removeEventListener('focusout', handleFocusout)
        }
    }, [callbackRef, htmlElement, ref])
}

export default useFocusOut
