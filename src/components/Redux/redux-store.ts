import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";


export const  rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage:usersReducer,
    auth:authReducer
   // sidebar: sidebarReducer

});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


//@ts-ignore
window.store = store
