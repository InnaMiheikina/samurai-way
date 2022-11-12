import React from "react";
import Header from "./Header";
import { logoutTC} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";



type MapStatePropsType = {
isAuth:boolean,
    login:string | null
}
type mapDispatchPropsType = {
    logoutTC:()=> void
}
export type HeaderPropsType = MapStatePropsType & mapDispatchPropsType

class HeaderContainer extends React.Component <HeaderPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}
const  mapStateToProps = (state: AppStateType): MapStatePropsType=> ({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})
export default connect(mapStateToProps, { logoutTC})(HeaderContainer);