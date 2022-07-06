import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { InitDialogsReducerStateType} from "../../Redux/dialogs-reducer";
import {Redirect} from 'react-router-dom';

type DialogsTypeProps = {
    updateNewMessageBody: (body:string)=> void
    sendMessage:()=> void
    dialogsPage: InitDialogsReducerStateType
    isAuth:boolean
}

function Dialogs(props: DialogsTypeProps) {
    let state = props.dialogsPage

    let messagesElement = state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);
    let dialogsElements = state.dialogs.map(d => <DialogItem  key={d.id} name={d.name} id={d.id}/>);
    let newMessageBody = state.newMessageBody

    const updateNewMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }
    const sendMessage = () => {
        props.sendMessage()
    }
    if(!props.isAuth) return <Redirect to={'/login'}/> //не залогинен?redirect

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <textarea value={newMessageBody} onChange= {updateNewMessageBody}
                              placeholder= {'Enter your message'}> </textarea>
                </div>
                <div>
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>

    )
};
export default Dialogs;