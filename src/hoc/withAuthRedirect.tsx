import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

type MapStateToProps = {
    isAuth: boolean
}
const mapStateToProps=(state:AppStateType):MapStateToProps=> {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect <T> (Component:ComponentType<T>) {
    const RedirectComponent = (props:MapStateToProps)=> {
        let{isAuth, ...restProps} = props
        if(!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }
    const ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}