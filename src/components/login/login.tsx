import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import style from './../FormsControls/FormsControls.module.css'


type FormDataType = {
    email:string
    password:string
    rememberMe:boolean
    captchaUrl:any|null

}
type PropsType = {
    captchaUrl: any | null

}
const LoginForm:React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'email'} placeholder={'Email'}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field name={'password'} placeholder={'Password'} type={'password'}
                           validate={[required]}
                           component={Input}/>
                </div>
                <div>
                    <Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me
                </div>
                {props.captchaUrl && <img src={props.captchaUrl} />}
                {props.captchaUrl &&  <Field name={'captcha'} placeholder={'Symbols from image'} type={''}
                    validate={[required]}
                    component={Input}/> }

                { props.error && <div className={style.formSummaryError}>
                    {props.error}
                </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType, PropsType>({form:'login'})(LoginForm)

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl:any | null
}
const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return{
        captchaUrl:state.auth.captchaUrl,
        isAuth:state.auth.isAuth
    }
}

type LoginPropsType =  {
    isAuth:boolean
    loginTC:(email:string, password:string, rememberMe:boolean,captchaUrl:any|null)=> void
    captchaUrl: any | null
}
const Login = (props:LoginPropsType) => {
    const onSubmit= (formData:FormDataType)=> {
       props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }
    if (props.isAuth){
        return<Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    );
};

export default  connect(mapStateToProps, {loginTC: loginTC})(Login);