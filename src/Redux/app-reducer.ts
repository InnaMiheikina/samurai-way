import {Dispatch} from "redux";
import {getAuthUserDataTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


export type InitialAppStateType = {
    initialized: boolean
}

const initialState: InitialAppStateType = {
    initialized: false
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionType): InitialAppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeAppTC = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserDataTC());

   Promise.all([promise]).then(()=> {
       dispatch(initializedSuccessAC())
   })
};

type ActionType = ReturnType<typeof initializedSuccessAC>;

