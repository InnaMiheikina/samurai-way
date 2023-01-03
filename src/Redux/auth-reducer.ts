import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'


export type InitialUsersStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

const initialState: InitialUsersStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false//залогинен
}

export const authReducer = (state: InitialUsersStateType = initialState, action: ActionType): InitialUsersStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }

        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: any, email: any, login: any, isAuth: any) => ({
    type: SET_USER_DATA, data:
        {userId, email, login, isAuth}
} as const)

export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));//созд. общая для всей формы ошибка
    }

}
export const logoutTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

type ActionType = ReturnType<typeof setAuthUserDataAC>

