import React from "react";
import {InitDialogsReducerStateType, sendMessageAC} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {withRouter} from "react-router-dom";


type MapStatePropsType = {
    dialogsPage: InitDialogsReducerStateType,
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody:string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}
export default compose <React.ComponentType>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    //withAuthRedirect
)(Dialogs)

