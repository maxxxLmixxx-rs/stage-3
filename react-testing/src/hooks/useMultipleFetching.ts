import { useCallback, useState } from 'react'

const useMultipleFetching = <T extends { [k: string]: boolean }>(
    initial: T
): [T, (key: keyof T) => (state: boolean) => void] => {
    const [isFetching, setFetchingRaw] = useState(initial)
    const setFetching = useCallback((key: keyof T) => {
        return (state: boolean): void => {
            setFetchingRaw((prev) => ({ ...prev, [key]: state }))
        }
    }, [])
    return [isFetching, setFetching]
}

export default useMultipleFetching
