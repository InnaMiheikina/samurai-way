export const required = (value:any) => {
    if(value) return undefined;

    return 'Field is required';
}//проверка на введение данных

export const maxLengthCreator= (maxLength:number) => (value:any) => {
    if(value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}//проверка на длину
// в инпуте если введены неверные данные загарается валидатор.