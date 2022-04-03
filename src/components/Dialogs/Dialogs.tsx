import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogsPageType} from "../Redax/state";



function Dialogs(props: dialogsPageType) {

    let messagesElement = props.messages.map(message => <Message message={message.message} id={message.id}/>);
    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>

    )
};
export default Dialogs;