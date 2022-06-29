

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

type ActionsType = ReturnType<typeof AddPostAC>
    | ReturnType<typeof UpDateNewPostTextAC>
    | ReturnType<typeof setUserProfile>
export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}
export type InitialProfileReducerStateType = {
    posts: Array<PostsType>
    newPostText: string
    profile:ProfileType | null
}
const initialState: InitialProfileReducerStateType = {
        posts: [
            {id: 1, message: 'Hi, how are you', likesCount: 12},
            {id: 2, message: 'It\'s  my first post', likesCount: 4}
        ],
        newPostText: "введите сooбщение...",
        profile:null
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
        case SET_USER_PROFILE: {
            return {...state, profile:action.profile}
        }
        default:
            return state
    }
}

export const AddPostAC = () => ({type: 'ADD-POST'} as const )
export const UpDateNewPostTextAC = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText: newText}as const)
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink:string
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: any
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType

    photos: PhotosType

}
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)

