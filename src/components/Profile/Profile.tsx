import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsConteiner";


/*
type ProfilePropsType = {
    posts: Array<PostsType>
    newPostText:string
    dispatch: Dispatch
    store:Store<RootStoreType>
}
*/

function Profile(){
    return  <div>
        <ProfileInfo/>
        <MyPostsContainer />
    </div>
}
export default Profile;
