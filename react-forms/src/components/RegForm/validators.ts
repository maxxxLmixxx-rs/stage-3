export type Validator = (param: string | boolean) => null | string
export const nameValidator = (name: string): null | string => {
    if (!name) return `Name is required`
    if (/[^A-Z0-9_]/gi.test(name)) return `Allowed symbols are: A-Z, 0-9, _`
    return null
}
export const dateValidator = (date: string): null | string => {
    const [yyyy] = date.split('-').map(Number)
    if (!date) return `Date is required`
    if (yyyy > 2006) return `Birthday should be less then 2006`
    if (yyyy < 1920) return `Birthday should be greater then 1920`
    return null
}
export const checkboxValidator = (checked: boolean): null | string => {
    return checked ? null : 'Checkbox should be checked'
}
export const passEvery = (some: string | boolean): null => null
