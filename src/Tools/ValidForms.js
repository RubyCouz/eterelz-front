import templateRegex from '../Data/template-regex'


export default function validForm(input, value, required) {
    let response = ''
    const inputTest = templateRegex[input].regex.test(value)

    if (value === '') {
        if (required) {
            response = templateRegex[input].message_empty
        }
    } else if (!inputTest) {
        response = templateRegex[input].message
    }
    return response
}