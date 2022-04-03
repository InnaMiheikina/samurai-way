import React from "react";
import s from "./ProfileInfo.module.css"


function ProfileInfo(){
    return  (
        <div>
        <div>
            <img src=" https://wpapers.ru/wallpapers/Space/11484/PREV_%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81.jpg" />
        </div>
            <div className= {s.descriptionBlock} >
                ava+description
            </div>

    </div>)
}
export default ProfileInfo;
