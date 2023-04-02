import React from "react";
import {Input, Textarea} from "../../FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import s from './ProfileInfo.module.css'
import style from "../../FormsControls/FormsControls.module.css";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription?: string
    aboutMe: string

}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType>> = (props) => {

    const profile = useSelector<AppStateType, any>(state => state.profilePage.profile)

    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {props.error && <div className={style.formSummaryError}>
            {props.error}
        </div>
        }
        <div>
            <b>Full name</b>: <Field name={'fullName'} placeholder={'Full name'}
                                     validate={[]}
                                     component={Input}/>
        </div>
        <div>
            <b>Looking For A Job</b>:<Field name={'lookingForAJob'} placeholder={'Looking for a job'}
                                            validate={[]}
                                            component={Input}
                                            type={'checkbox'}
        />
        </div>

        {/*{profile.lookingForAJob &&*/}
        <div>
            <b>My professional skills</b>: <Field name={'lookingForAJobDescription'}
                                                  placeholder={'My professional skills'}
                                                  validate={[]}
                                                  component={Textarea}
        />
        </div>
        {/*}*/}
        <div>
            <b>About me</b>: <Field name={'aboutMe'} placeholder={'About me'}
                                    validate={[]}
                                    component={Textarea}
        />
        </div>
        <b>Status</b>: <div>{profile.status}</div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:<Field name={'contacts.' + key} placeholder={key}
                                validate={[]}
                                component={Input}
                /></b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;
