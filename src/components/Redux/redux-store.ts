import {combineReducers, createStore, Store} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";


export const  reducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
   // sidebar: sidebarReducer

});

export type RootStateType = ReturnType<typeof reducer>

let store: Store<RootStateType> = createStore(reducer);


//@ts-ignore
window.store = store

export default store;