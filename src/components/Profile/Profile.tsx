import React from "react";
import  s from "./Profile.module.css";
import MyPosts from  "./MyPosts/MyPosts"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionType, PostsType} from "../Redax/state";

type ProfilePropsType = {
    posts: Array<PostsType>
   /* addPost:(newPostText:string) => void
    updateNewPostText:(newText:string) => void*/
    newPostText:string
    dispatch: (action:ActionType) => void
}

function Profile(props: ProfilePropsType){
    return  <div>
        <ProfileInfo/>
        <MyPosts  newPostText = {props.newPostText} posts={props.posts} dispatch = {props. dispatch} />
    </div>
}
export default Profile;
