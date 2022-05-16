import React from "react";
import { InitDialogsReducerStateType, sendMessageAC, updateNewMessageBodyAC} from "../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../Redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    dialogsPage:InitDialogsReducerStateType
}

let mapStateToProps = (state:RootStateType):MapStatePropsType => {
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