import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer  from "./MyPosts/MyPostsConteiner";
import {InitialProfileReducerStateType} from "../../Redux/profile-reducer";


type ProfilePropsType = {
    profile:InitialProfileReducerStateType['profile']
    status:string
    updateStatus:(status: string) => void
}

function Profile(props:ProfilePropsType){
    return  <div>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer />
    </div>
}
export default Profile;
