import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType, setUserProfile} from "../../Redux/profile-reducer";
import {withRouter, RouteComponentProps} from 'react-router-dom';

type MapStatePropsType = {
    profile: ProfileType | null
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                console.log(response)
                this.props.setUserProfile(response.data)
            });
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
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);