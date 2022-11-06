import {authAPI} from "../api/api";
import {Dispatch} from "redux";

const SET_USER_DATA = 'SET_USER_DATA'



export type InitialUsersStateType={
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth:boolean
}

const initialState:InitialUsersStateType ={
    userId: null,
    email: null,
    login: null,
    isAuth:false//залогинен
}

export const authReducer = (state:InitialUsersStateType=initialState, action:ActionType):InitialUsersStateType=> {
    switch (action.type) {
        case SET_USER_DATA:
        return {
        ...state,
            ...action.data,
            isAuth:true
        }

        default:
            return state
    }
}

export const setAuthUserData = (userId:number,email:string, login:string) => ({type: SET_USER_DATA, data:{userId,email,login}} as const  )
export const getAuthUserData = () =>(dispatch:Dispatch)=>{
    authAPI.me()
        .then(response => {
            debugger
            if (response.data.resultCode===0) {
                let {id,email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        });
}

type ActionType = ReturnType<typeof setAuthUserData>

