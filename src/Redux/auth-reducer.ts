const SET_USER_DATA = 'SET_USER_DATA'



export type InitialUsersStateType={
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth:boolean
}

const initialState:InitialUsersStateType ={
    id: null,
    email: null,
    login: null,
    isAuth:false
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

type ActionType = ReturnType<typeof setAuthUserData>

