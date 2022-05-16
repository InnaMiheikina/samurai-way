import React from 'react';
import {Store} from "redux";
import {RootStateType} from "./components/Redux/redux-store";


const StoreContext = React.createContext({} as Store<RootStateType>)

export type providerType = {
    store: Store<RootStateType>
    children: React.ReactNode
}
export const Provider = (props:providerType) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext;