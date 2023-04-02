import {getAuthUserDataTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const GLOBAL_ERROR = 'GLOBAL_ERROR'
const ERROR = 'ERROR'

export type InitialAppStateType = {
    initialized: boolean,
    globalError:string | null
    error:string | null
}

const initialState: InitialAppStateType = {
    initialized: false,
    globalError:null,
    error:null
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionType): InitialAppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.globalError
            }
            case ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS} as const)
export const globalErrorAC = (globalError:string) => ({type: GLOBAL_ERROR, globalError} as const)
export const setAppErrorAC = (error:string)=>({type:ERROR, error } as const)

export const initializeAppTC = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataTC());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccessAC())
    })
};

type ActionType = ReturnType<typeof initializedSuccessAC> | ReturnType<typeof globalErrorAC> | ReturnType<typeof setAppErrorAC>;

