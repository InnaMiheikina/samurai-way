import {AnyAction, Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'
const DELETE_POST = 'profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS'
const SAVE_PROFILE = 'profile/SAVE-PROFILE'

type ActionsType = ReturnType<typeof AddPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePostAC> | ReturnType<typeof savePhotoSuccessAC> | ReturnType<typeof saveProfileAC>

export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}
export type InitialProfileReducerStateType = {
    posts: Array<PostsType>
    profile: any | null
    status: string
}
const initialState: InitialProfileReducerStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It\'s  my first post', likesCount: 4}
    ],
    profile: null,
    status: ""
}
export const profileReducer = (state = initialState, action: ActionsType): InitialProfileReducerStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}
        case SAVE_PROFILE:
            return {...state, profile: {...state, profile: action.profile}}

        default:
            return state
    }
}


export const AddPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const deletePostAC = (postId: number) => ({type: DELETE_POST, postId} as const)
export const savePhotoSuccessAC = (photos: string) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
export const saveProfileAC = (profile: any) => ({type: SAVE_PROFILE, profile} as const)


export const getUserProfile = (userId: number | null) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId!)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: string) => async (dispatch: Dispatch) => {
    let res = await profileAPI.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(res.data.data.photos))
    }
}
export const saveProfile = (profile: any) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.userId;
    const res = await profileAPI.saveProfile(profile);
    if (res.data.resultCode === 0) {
        dispatch(getUserProfile(userId) as unknown as AnyAction);
    } else {
        dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
        return Promise.reject(res.data.messages[0])
    }
}


type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
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

