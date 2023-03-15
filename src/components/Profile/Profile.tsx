import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer  from "./MyPosts/MyPostsConteiner";
import {InitialProfileReducerStateType} from "../../Redux/profile-reducer";


type ProfilePropsType = {
    profile:InitialProfileReducerStateType['profile']
    status:string
    updateStatus:(status: string) => void
    isOwner:any
    savePhoto:any
}

function Profile(props:ProfilePropsType){
    return  <div>
        <ProfileInfo profile={props.profile}
                     isOwner={props.isOwner}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
        />
        <MyPostsContainer  />
    </div>
}
export default Profile;
