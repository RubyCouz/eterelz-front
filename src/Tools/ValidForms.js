import templateRegex from '../Data/template-regex'


export default function validForm (input, value) {
    let response = ''
    console.log(input)
    console.log(value)
    const inputTest = templateRegex[input].regex.test(value)
        if(!inputTest) {
            response = templateRegex[input].message
        }else if(value === '') {
            response = templateRegex[input].message_empty
        }
    return response
}