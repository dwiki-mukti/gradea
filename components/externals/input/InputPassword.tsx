
import React, { DetailedHTMLProps, Dispatch, FormEvent, InputHTMLAttributes, ReactNode, SetStateAction, useEffect, useState } from 'react'
import validator from './validatorUtils'

export interface typeInputPasswordProps extends Omit<DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>, 'value' | 'defaultValue' | 'type'> {
    label?: ReactNode,
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    noLabel?: boolean,
    validations?: typeValidations,
    name: string,
}

function InputPassword({
    label,
    setter,
    getter,
    noLabel,
    validations,

    className,
    onInput,
    name,
    id,

    ...props
}: typeInputPasswordProps) {
    /**
     * State declaration
     */
    const [IsVisible, setIsVisible] = useState(false)

    /**
     * Function Handler
     */
    function onChangeValue(e: FormEvent<HTMLInputElement>) {
        if (onInput) onInput(e)
        setter((prev: typeStateInput) => {
            const valueInput = (e.target as HTMLInputElement).value
            const invalidMessages: string[] = validations ? validator({ validations, value: valueInput }) : []

            return ({
                ...prev,
                values: { ...(prev.values), [name]: valueInput },
                invalids: { ...(prev.invalids), [name]: invalidMessages }
            })
        })
    }

    /**
     * Render JSX
     */
    return (
        <div className={`input-group ${className} ${getter?.invalids?.[name]?.length ? 'input-group-invalid' : ''}`}>
            {(!noLabel) && (<label htmlFor={id ?? name}>{label ?? name}</label>)}
            <input
                value={getter?.values?.[name] ?? ''}
                onInput={onChangeValue}
                id={id ?? name}
                name={name}
                {...props}
                type={IsVisible ? 'text' : 'password'}
            />
            {Boolean(getter?.invalids?.[name]?.length) && (
                <div className='invalid-message'>{getter?.invalids?.[name][0]}</div>
            )}
        </div>
    )
}

export default InputPassword