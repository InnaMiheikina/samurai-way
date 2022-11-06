import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../Redux/profile-reducer";
import { RouteComponentProps,withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";




type MapStatePropsType = {
    profile: ProfileType | null
    status:string

}
type MapDispatchPropsType = {
    getUserProfile: (userId:string) => void
    getStatus:(userId:string) => void
    updateStatus:(status: string) => void
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '23655'
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status:state.profilePage.status
})

export default compose<React.ComponentType>(
    withRouter,
   connect(mapStateToProps, {getUserProfile,getStatus,updateStatus}),
    //withAuthRedirect
)(ProfileContainer)
