import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {InitDialogsReducerStateType} from "../../Redux/dialogs-reducer";
import {Redirect} from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type DialogsTypeProps = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (newMessageBody: string) => void
    dialogsPage: InitDialogsReducerStateType
    isAuth: boolean
}

function Dialogs(props: DialogsTypeProps) {
    let state = props.dialogsPage

    let messagesElement = state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);
    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody);
    }
//if(!props.isAuth) return <Redirect to={'/login'}/>;
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElement}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>

    )
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLength50]}
                       placeholder={'Enter your message'}
                       name='newMessageBody'/>
            </div>
            <div>
                <button>send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;