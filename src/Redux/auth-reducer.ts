import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'


export type InitialUsersStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl:  null | any
}

const initialState: InitialUsersStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,//залогинен
    captchaUrl: null
}

export const authReducer = (state: InitialUsersStateType = initialState, action: ActionType): InitialUsersStateType => {

    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: any, email: any, login: any, isAuth: any) => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
} as const)
export const getCaptchaUrlSuccess = (captchaUrl: null | any) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
} as const)


export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean,captchaUrl:any | null):AppThunk => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe,captchaUrl)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaTC())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));//созд. общая для всей формы ошибка
    }

}

export const getCaptchaTC = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logoutTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

type ActionType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlSuccess>

