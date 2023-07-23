import { typeFieldInput, typeStateInput } from "@/interfaces/externals/input";


export function checkFormIsValid({ getter, fields }: { getter: typeStateInput, fields: typeFieldInput[] }) {
    // check length invalid message
    const invalidColumns = Object.keys(getter.invalids ?? {}).filter(
        (fieldName) => (getter.invalids?.[fieldName]?.length)
    );

    // get empty required field
    const emptyFields = fields.filter((field) => {
        const isRequired = field.validations?.required
        const valueColumn = getter.values?.[field.name]
        return isRequired && !valueColumn
    });
}