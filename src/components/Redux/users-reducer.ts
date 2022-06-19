const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE='SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT='SET-TOTAL-USERS-COUNT'


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
    users:UsersType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage:number //страницы
}

const initialState:InitialUsersStateType ={
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1
}

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
            return {...state, users:action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage:action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount:action.count}
        }
        default:
            return state
    }
}

export const followAC = (userId:number) => ({type: FOLLOW, userId} as const  )
export const unfollowAC = (userId:number) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users:UsersType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (currentPage:number) => ({type:SET_CURRENT_PAGE,currentPage} as const)
export const setUsersTotalCountAC = (totalUsersCount:number) => ({type:SET_TOTAL_USERS_COUNT,count:totalUsersCount} as const)

type ActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    |ReturnType<typeof setCurrentPageAC>
    |ReturnType<typeof setUsersTotalCountAC>

