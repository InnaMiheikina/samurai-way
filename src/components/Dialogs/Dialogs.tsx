import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogType, InitDialogsReducerStateType, MessageType} from "../Redux/dialogs-reducer";

type DialogsTypeProps = {
    updateNewMessageBody: (body:string)=> void
    sendMessage:()=> void
    dialogsPage: InitDialogsReducerStateType
}

function Dialogs(props: DialogsTypeProps) {
    let state = props.dialogsPage

    let messagesElement = state.messages.map(message => <Message message={message.message} id={message.id}/>);
    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let newMessageBody = state.newMessageBody

    const updateNewMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }
    const sendMessage = () => {
        props.sendMessage()
    }

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