import React, {memo} from "react";
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../FormsControls/FormsControls";


type MyPostTypeProps = {
    posts: Array<PostDataType>
    addPost:(newPostText:string)=>void
}
type PostDataType = {
    id: number,
    message: string,
    likesCount: number
}

const MyPosts = memo((props: MyPostTypeProps) => {
    console.log('memo')
    const postsElements = props.posts.map((e) => {
        return (
            <li key={e.id}><Post  message={e.message} likesCount={e.likesCount}/>
            </li>
        )
    })

    const onAddPost = (values:any) => {
        props.addPost(values.newPostText)
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>;
})

let maxLength10 = maxLengthCreator(10);
const AddNewPostForm:React.FC<InjectedFormProps> =(props ) =>{
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='newPostText' component={Textarea} validate={[required,maxLength10]} placeholder={'post message'}/>
        </div>
        <div>
            <button >Add post</button>
        </div>
    </form>;
}

const AddNewPostFormRedux = reduxForm({form:'ProfileAddNewPostForm'})(AddNewPostForm);

export default MyPosts;