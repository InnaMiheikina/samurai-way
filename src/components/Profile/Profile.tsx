import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer  from "./MyPosts/MyPostsConteiner";
import {InitialProfileReducerStateType} from "../Redux/profile-reducer";


type ProfilePropsType = {
    profile:InitialProfileReducerStateType['profile']
}

function Profile(props:ProfilePropsType){
    return  <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer />
    </div>
}
export default Profile;
