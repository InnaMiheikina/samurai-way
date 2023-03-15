import React from "react";
import s from "./ProfileInfo.module.css"
import {InitialProfileReducerStateType} from "../../../Redux/profile-reducer";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: InitialProfileReducerStateType['profile']
    status: string
    updateStatus: (status: string) => void
    isOwner: any
    savePhoto:any
}

function ProfileInfo({status, updateStatus, profile, isOwner, savePhoto}: ProfileInfoPropsType) {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={s.descriptionBlock}>
            <img
                src={profile.photos.large || 'https://img.freepik.com/free-photo/river-surrounded-by-forests-under-a-cloudy-sky-in-thuringia-in-germany_181624-30863.jpg?w=2000'}
                className={s.mainPhoto}/>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
}


export default ProfileInfo;
