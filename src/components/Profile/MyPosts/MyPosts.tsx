import React, {ChangeEvent, useRef} from "react";
import Post from "./Post/Post";
import s from './MyPosts.module.css';


type MyPostTypeProps = {
    posts: Array<PostDataType>
    newPostText: string
    addPost:()=>void
    updateNewPostText:(text:string)=>void
}
type PostDataType = {
    id: number,
    message: string,
    likesCount: number
}

function MyPosts(props: MyPostTypeProps) {
    const postsElements = props.posts.map((e) => {
        return (
            <li key={e.id}><Post message={e.message} likesCount={e.likesCount}/>
            </li>
        )
    })

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
       props.updateNewPostText(text)
    }

    const onAddPost = () => {
        props.addPost()
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea onChange={onPostChange} value={props.newPostText}/>
            </div>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>

        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>;
}


export default MyPosts;