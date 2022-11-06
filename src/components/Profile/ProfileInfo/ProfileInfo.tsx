import React from "react";
import s from "./ProfileInfo.module.css"
import {InitialProfileReducerStateType} from "../../../Redux/profile-reducer";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: InitialProfileReducerStateType['profile']
    status: string
    updateStatus: (status: string) => void
}

function ProfileInfo(props: ProfileInfoPropsType) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (

           /* <div >
                <img  className={s.img} src='https://img.freepik.com/free-photo/river-surrounded-by-forests-under-a-cloudy-sky-in-thuringia-in-germany_181624-30863.jpg?w=2000' />
            </div>*/
            <div className={s.descriptionBlock}>
                {props.profile ? <img
                        src={props.profile.photos.small
                            ? props.profile.photos.large
                            : 'https://img.freepik.com/free-photo/river-surrounded-by-forests-under-a-cloudy-sky-in-thuringia-in-germany_181624-30863.jpg?w=2000'}/> :
                    <Preloader/>}
            <span>{props.profile ? props.profile.contacts.github : 'loading'}</span>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
    )}


export default ProfileInfo;
