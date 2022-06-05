const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'


export type UsersType = {
    name: string,
    id: number,
    photos: {
        small: any,
        large: any
    },
    status: string,
    followed: boolean
}
export type InitialUsersStateType={
users:UsersType[]
}
const initialState:InitialUsersStateType ={
    users: []}
export const usersReducer = (state:InitialUsersStateType=initialState, action:ActionType):InitialUsersStateType=> {
    switch (action.type) {
        case FOLLOW:
        return {
            ...state,
            users:state.users.map(u =>u.id ===action.userId ?{...u,followed:true}: u)
        }

        case UNFOLLOW:
            return {
                ...state,
                users:state.users.map(u =>u.id ===action.userId ?{...u,followed:false}: u)
            }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state
    }
}

export const followAC = (userId:number) => ({type: FOLLOW, userId} as const  )
export const unfollowAC = (userId:number) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users:UsersType[]) => ({type: SET_USERS, users} as const)

type ActionType = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>

