const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

type ActionsType = ReturnType<typeof AddPostAC> | ReturnType<typeof UpDateNewPostTextAC>
export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}
export type InitialProfileReducerStateType = {
    posts: Array<PostsType>
    newPostText: string
}
const initialState: InitialProfileReducerStateType = {
        posts: [
            {id: 1, message: 'Hi, how are you', likesCount: 12},
            {id: 2, message: 'It\'s  my first post', likesCount: 4}
        ],
        newPostText: "введите сooбщение..."
    }
export const profileReducer = (state=initialState, action:ActionsType):InitialProfileReducerStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            };
            return {...state,
                posts:[...state.posts,newPost],
                newPostText:''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
           return {
               ...state,
               newPostText: action.newText
            }
        }
        default:
            return state
    }
}

export const AddPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
        }
export const UpDateNewPostTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }as const
        };

