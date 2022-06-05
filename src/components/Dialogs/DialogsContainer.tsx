import React from "react";
import { InitDialogsReducerStateType, sendMessageAC, updateNewMessageBodyAC} from "../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../Redux/redux-store";

type MapStatePropsType = {
    dialogsPage:InitDialogsReducerStateType
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
    dialogsPage: state.dialogsPage
}
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: ()=> {
            dispatch(sendMessageAC())
        },
        updateNewMessageBody:(body:string)=> {
            dispatch(updateNewMessageBodyAC(body))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;