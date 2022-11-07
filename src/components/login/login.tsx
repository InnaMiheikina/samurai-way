import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type FormDataType = {
    login:string
    password:string
    rememberMe:boolean
}

const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'login'} placeholder={'Login'}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field name={'password'} placeholder={'Password'}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
};
const LoginReduxForm = reduxForm<FormDataType>({form:'login'})(LoginForm)
const Login = () => {
    const onSubmit= (formData:FormDataType)=> {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
export default Login;