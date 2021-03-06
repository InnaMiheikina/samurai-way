import React from "react";
import Header from "./Header";
import axios from "axios";
import {getAuthUserData, setAuthUserData} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {authAPI} from "../../api/api";


type MapStatePropsType = {
isAuth:boolean,
    login:string | null
}
type mapDispatchPropsType = {
    getAuthUserData:() => void
}

export type HeaderPropsType = MapStatePropsType & mapDispatchPropsType
class HeaderContainer extends React.Component <HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }
    render() {
        return <Header {...this.props}/>
    }
}
const  mapStateToProps = (state: AppStateType): MapStatePropsType=> ({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})
export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);