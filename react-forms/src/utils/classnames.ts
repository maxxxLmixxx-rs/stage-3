type ImportedStyles = CSSModule | { [cs: string]: string }
type Props = {
    string: string
    object: { [cs: string]: boolean }
    array: string[]
    nullable: null | undefined
}

const isObjectLike = (some: any): boolean => some instanceof Object
const isArray = (some: any): boolean => Array.isArray(some)

const isString = (some: any): boolean => typeof some === 'string'
const isObject = (some: any): boolean => isObjectLike(some) && !isArray(some)

const handleString = (cs: Props['string']): string => {
    return cs.trim()
}
const handleObject = (cs: Props['object']): string[] => {
    return Object.entries(cs).map(([k, v]) => (v ? k.trim() : ''))
}
const handleArray = (cs: Props['array']): string[] => {
    return cs.map((c) => c.trim())
}

export default (() => ({
    bind: (importedStyles: ImportedStyles) => {
        return (...classNames: Props[keyof Props][]) => {
            return (
                classNames
                    .map((cs) => {
                        if (isString(cs))
                            return handleString(cs as Props['string'])
                        if (isObject(cs))
                            return handleObject(cs as Props['object'])
                        if (isArray(cs))
                            return handleArray(cs as Props['array'])
                        return ''
                    })
                    .flat()
                    .filter(Boolean)
                    .map((cs) => importedStyles[cs])
                    .join(' ') || undefined
            )
        }
    },
}))()
