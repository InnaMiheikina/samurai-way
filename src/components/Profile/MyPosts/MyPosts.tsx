import React, {ChangeEvent, useRef} from "react";
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {ActionType, AddPostAC, UpDateNewPostTextAC} from "../../Redax/state";


type PostDataTypeProps = {
    posts: Array<PostDataType>
   /* addPost:(newPostText:string) => void*/
   /* updateNewPostText:(newText:string) => void*/
   newPostText:string
    dispatch:(action:ActionType)=> void
}
type PostDataType = {
    id: number,
    message: string,
    likesCount: number
}

function MyPosts(props: PostDataTypeProps) {
    const  postsElements = props.posts.map((e) => {
        return (
            <li key={e.id}><Post message={e.message} likesCount={e.likesCount}/>
            </li>
        )
    })

    const addPost = () => {
           props.dispatch(AddPostAC(props.newPostText))
        }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(UpDateNewPostTextAC(e.currentTarget.value));
        }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea  value={props.newPostText}
                          onChange={onPostChange} />
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
                {/*добавляем пост*/}
            </div>

        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>;
}


export default MyPosts;