import React from "react";
import Header from "./Header";
import axios from "axios";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";


type MapStatePropsType = {
isAuth:boolean,
    login:string | null
}
type mapDispatchPropsType = {
    setAuthUserData:(userId:number,email:string, login:string) => void
}

export type HeaderPropsType = MapStatePropsType & mapDispatchPropsType
class HeaderContainer extends React.Component <HeaderPropsType> {
    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials:true //точно нужно отправлять куки
        })
            .then(response => {
if (response.data.resultCode===0) {
    let {id,email, login} = response.data.data
    this.props.setAuthUserData(id, email, login)
}
            });
    }
    render() {
        return <Header {...this.props}/>
    }
}
const  mapStateToProps = (state: AppStateType): MapStatePropsType=> ({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);