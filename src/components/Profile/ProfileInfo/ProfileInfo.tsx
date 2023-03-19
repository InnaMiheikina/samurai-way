import React, {useState} from "react";
import s from "./ProfileInfo.module.css"
import {InitialProfileReducerStateType} from "../../../Redux/profile-reducer";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm, {ProfileFormDataType} from "./ProfileDataForm";



type ProfileInfoPropsType = {
    profile: InitialProfileReducerStateType['profile']
    status: string
    updateStatus: (status: string) => void
    isOwner: any
    savePhoto: any
    saveProfile:(profile:any)=>Promise<any>
}

function ProfileInfo({status, updateStatus, profile, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit =  (formData:ProfileFormDataType)=> {
        const pr = saveProfile(formData)

        pr.then(
            () => {
                setEditMode(false)
            })
    }

    return (
        <div className={s.descriptionBlock}>
            <img
                src={profile.photos.large || 'https://img.freepik.com/free-photo/river-surrounded-by-forests-under-a-cloudy-sky-in-thuringia-in-germany_181624-30863.jpg?w=2000'}
                className={s.mainPhoto}/>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            { editMode ? <ProfileDataForm onSubmit={onSubmit} initialValues={profile} /> :  <ProfileData profile={profile}  goToEditMode={()=>{setEditMode(true)}} isOwner={isOwner} />}

            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
}

type contactType = {
    contactTitle: any
    contactValue: any
}

type ProfileDataType={
    profile:InitialProfileReducerStateType['profile']
    isOwner:any
    goToEditMode:()=>void
}
const ProfileData = ({profile, isOwner,goToEditMode}:  ProfileDataType) => {
   // console.log(profile.aboutMe)
  return  <div>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key}/>
        })}
        </div>
    </div>
}
const Contact = ({contactTitle, contactValue}: contactType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
