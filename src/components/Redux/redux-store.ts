import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import {usersReducer} from "./users-reducer";


export const  rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage:usersReducer
   // sidebar: sidebarReducer

});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


//@ts-ignore
window.store = store
