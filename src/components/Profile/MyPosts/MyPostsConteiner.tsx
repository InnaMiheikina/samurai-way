import React from "react";
import {AddPostAC, PostsType, UpDateNewPostTextAC} from "../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";

/*type PostDataTypeProps = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: Dispatch
    store: Store<RootStoreType>
}*/

type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
}
type MapDispatchPropsType = {
    addPost: () =>void
    updateNewPostText: (text: string) =>void
}
let mapStateToProps = (state: RootStateType):  MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: () => {
            dispatch(AddPostAC())
        },
        updateNewPostText: (text: string) => {
            dispatch(UpDateNewPostTextAC(text))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;