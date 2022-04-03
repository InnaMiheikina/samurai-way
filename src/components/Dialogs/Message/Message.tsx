import React from "react";
import s from './../Dialogs.module.css';
import {messagesType} from "../../Redax/state";


function Message (props:messagesType) {
    debugger
    return <div className={s.message}>{props.message}</div>
}



export default Message;