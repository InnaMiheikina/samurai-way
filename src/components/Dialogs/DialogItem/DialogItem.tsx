import React from "react";
import {NavLink} from "react-router-dom";
import s from '../Dialogs.module.css';
import {DialogType} from "../../../Redux/dialogs-reducer";

function DialogItem(props: DialogType) {
    let path = "/dialogs/"  + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
