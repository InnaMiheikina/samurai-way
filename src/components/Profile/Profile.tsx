import React from "react";
import  s from "./Profile.module.css";
import MyPosts from  "./MyPosts/MyPosts"

function Profile(){
    return  <div className={s.content} >
        <div>
            <img src=" https://img1.akspic.ru/previews/1/3/0/5/4/145031/145031-glaz-krug-rozovyj-resnichka-graficeskij_dizajn-500x.jpg" />
        </div>
        <div>
            ava+description
        </div>
        <MyPosts />
    </div>
}
export default Profile;
