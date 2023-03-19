import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer  from "./MyPosts/MyPostsConteiner";
import {InitialProfileReducerStateType} from "../../Redux/profile-reducer";
import s from './Profile.module.css'


type ProfilePropsType = {
    profile:InitialProfileReducerStateType['profile']
    status:string
    updateStatus:(status: string) => void
    isOwner:any
    savePhoto:any
    saveProfile:(profile:any)=>Promise<any>
}

function Profile(props:ProfilePropsType){
    return  <div className={s.profileItem}>
        <ProfileInfo profile={props.profile}
                     isOwner={props.isOwner}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     saveProfile={props.saveProfile}
                     savePhoto={props.savePhoto}
        />
        <MyPostsContainer  />
    </div>
}
export default Profile;
