import { DetailedHTMLProps, InputHTMLAttributes } from "react"

export type typeStateInput = {
    values?: Record<string, any>,
    invalids?: Record<string, string[]>,
    statusCode?: number
}


export type typeValidations = {
    required?: boolean,
    max?: number,
    min?: number,
    length?: number,
    allowedTypes?: string[],
    passwordConfirmed?: boolean
}


export type typeFieldInput = DetailedHTMLProps<
    InputHTMLAttributes<(HTMLInputElement | HTMLTextAreaElement)>,
    (HTMLInputElement | HTMLTextAreaElement)
> & {
    // default props of all imput component
    name: string,
    col?: string,
    label?: ReactNode,
    noLabel?: boolean,
    validations?: typeValidations,

    // state manager
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,

    // props input text only
    suggests?: any[],

    // other props
    // code...
}
