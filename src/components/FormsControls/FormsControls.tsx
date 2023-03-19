import React, {HTMLInputTypeAttribute} from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

type FormsControls = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}
 const  FormControl =({input,meta,child,...props}:any)=> {
     const hasError = meta.touched && meta.error;
     return (
         <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
             <div>
                 {props.children}
             </div>
             {hasError && <span>{meta.error}</span> }
         </div>
     )
}

export const Textarea = (props:FormsControls) => {
    const {input,meta, ...restProps} = props;
   return <FormControl {...props}><textarea{...input} {...restProps} /></FormControl>
}
//meta.touched=был тронут
export const Input = (props:any) => {
    const {input,meta,child, ...restProps} = props;
    return <FormControl {...props}><input{...input} {...restProps} /></FormControl>
}
type createFieldType={
    placeholder:string
    name:string
    validators:any
    component?:any
    props?:any,
    text?:string
}
export const createField=(placeholder:any,name:any, validators:any,component:any,props?:any,text?:any ) => {
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        />{text}
    </div>
}