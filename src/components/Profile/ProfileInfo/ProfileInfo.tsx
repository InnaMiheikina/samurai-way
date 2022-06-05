import React from "react";
import s from "./ProfileInfo.module.css"


function ProfileInfo(){
    return  (
        <div>
        <div >
            <img  className={s.img} src='https://img.freepik.com/free-photo/river-surrounded-by-forests-under-a-cloudy-sky-in-thuringia-in-germany_181624-30863.jpg?w=2000' />
        </div>
            <div className= {s.descriptionBlock} >
                ava+description
            </div>

    </div>)
}
export default ProfileInfo;
