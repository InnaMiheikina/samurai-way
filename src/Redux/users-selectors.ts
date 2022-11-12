import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

 export  const getUsersSelector = (state:AppStateType)=> {
    return state.usersPage
}
/*export  const  getUsersPage = createSelector(getUsersSelector,
    (usersPage)=> {
    return usersPage.users.filter(u => true)
})*/
