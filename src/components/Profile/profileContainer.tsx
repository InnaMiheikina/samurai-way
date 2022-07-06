import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {getUserProfile, ProfileType} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps} from 'react-router-dom';


type MapStatePropsType = {
    profile: ProfileType | null
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
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);