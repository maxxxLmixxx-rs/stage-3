import { ChangeEvent, FormEvent, useState } from 'react'
import s from './RegForm.module.scss'
import classnames from '../../utils/classnames'
import Form, { OneLine } from '../@common/@form/Form/Form'
import Checkbox from '../@common/@form/Checkbox/Checkbox'
import DatePick from '../@common/@form/DatePick/DatePick'
import Select from '../@common/@form/Select/Select'
import Switcher from '../@common/@form/Switcher/Switcher'
import TextField from '../@common/@form/TextField/TextField'
import Button from '../@common/Button/Button'
import {
    checkboxValidator,
    dateValidator,
    nameValidator,
    passEvery,
    Validator,
} from './validators'

const cx = classnames.bind(s)

/** @Types */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
type ValueOf<T> = T[keyof T]
type KeyOf<T> = keyof T
type Entries<T> = [KeyOf<T>, ValueOf<T>][]
type Initial = typeof initial
type InputChangeCreator = <T extends HTMLInputElement | HTMLSelectElement>(
    fieldName: keyof typeof errorValidators
) => (e: ChangeEvent<T>) => void
type ValuesType = {
    [key in keyof Initial]: Initial[key]['value']
}
type ErrorsType = {
    [key in keyof Initial]: Initial[key]['error'] | null
}
type ToOmit = 'checked'
type BeforeValues = Optional<ValuesType, ToOmit>
type SubmitValues = Omit<ValuesType, ToOmit>
type IRegForm = {
    onFinalSubmit?: (e: FormEvent, values: SubmitValues) => void
}

const Countries = ['Russia', 'Belarus', 'Ukraine', 'Kazakhstan']

/** @Initial */
const initial = {
    name: {
        value: '',
        error: '',
    },
    surname: {
        value: '',
        error: '',
    },
    date: {
        value: '',
        error: '',
    },
    country: {
        value: Countries[0],
        error: '',
    },
    male: {
        value: true,
        error: '',
    },
    checked: {
        value: false,
        error: '',
    },
}

const initialValues = Object.fromEntries(
    Object.entries(initial).map(([k, v]) => [k, v.value])
) as ValuesType

const initialErrors = Object.fromEntries(
    Object.entries(initial).map(([k, v]) => [k, v.error])
) as ErrorsType

/** @Validators */
const errorValidators = {
    name: nameValidator,
    surname: nameValidator,
    date: dateValidator,
    country: passEvery,
    male: passEvery,
    checked: checkboxValidator,
} as {
    [key in keyof ValuesType]: Validator
}

/** @Components */
const RegForm: React.FC<IRegForm> = (props) => {
    const { onFinalSubmit = () => null } = props

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)

    const hasError = (errorsObj?: ErrorsType): boolean => {
        return Object.values(errors || errorsObj).some(Boolean)
    }

    const reset = (): void => {
        setValues(initialValues)
        setErrors(initialErrors)
    }

    const onInputChangeCreator: InputChangeCreator = (fieldName) => (e) => {
        const targetValue =
            e.currentTarget.type === 'checkbox'
                ? !values[fieldName]
                : e.currentTarget.value
        setValues((objValues) => {
            return { ...objValues, [fieldName]: targetValue }
        })
        setErrors((objErrors) => {
            const validator = errorValidators[fieldName]
            const newError = validator(targetValue)
            return { ...objErrors, [fieldName]: newError }
        })
    }

    const renderErrors = (): boolean => {
        const valueEntries = Object.entries(values) as Entries<ValuesType>
        const errorEntries = valueEntries.map(([key, toCheck]) => {
            const validator = errorValidators[key]
            return [key, validator(toCheck)]
        })
        const checkErrors = Object.fromEntries(errorEntries)
        setErrors(checkErrors)
        return hasError(errors) || !values.checked
    }

    const onSubmit = (e: FormEvent): void => {
        e.preventDefault()
        const willError = renderErrors()
        if (!willError) {
            const copied = { ...values } as BeforeValues
            delete copied.checked
            onFinalSubmit(e, copied)
            reset()
        }
    }

    return (
        <Form onSubmit={onSubmit} className={cx('RegForm')}>
            <TextField
                id="name"
                onChange={onInputChangeCreator('name')}
                value={values.name}
                error={errors.name}
                label="Name"
                placeholder="Name"
            />
            <TextField
                id="surname"
                onChange={onInputChangeCreator('surname')}
                value={values.surname}
                error={errors.surname}
                label="Surname"
                placeholder="Surname"
            />
            <DatePick
                id="date"
                onChange={onInputChangeCreator('date')}
                value={values.date}
                error={errors.date}
                label="Date"
            />
            <Select
                onChange={onInputChangeCreator('country')}
                value={values.country}
                label="Country"
            >
                {Countries.map((country, ix) => (
                    <option key={ix}>{country}</option>
                ))}
            </Select>
            <Switcher
                onChange={onInputChangeCreator('male')}
                active={!values.male}
                left="Male"
                right="Female"
            />
            <OneLine>
                <Checkbox
                    onChange={onInputChangeCreator('checked')}
                    error={Boolean(errors.checked) && !values.checked}
                    checked={values.checked}
                    label="I agree to process"
                />
                <Button type="submit" notAllow={hasError() || !values.checked}>
                    Create card
                </Button>
            </OneLine>
        </Form>
    )
}

export default RegForm
