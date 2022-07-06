import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {getUserProfile, ProfileType} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps, Redirect} from 'react-router-dom';


type MapStatePropsType = {
    profile: ProfileType | null
    isAuth:boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId:string) => void
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if(!this.props.isAuth) return <Redirect to={'/login'}/> //не залогинен?redirect
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth:state.auth.isAuth
})
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);