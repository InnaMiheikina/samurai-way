import React from 'react';
import './index.css';
import store, {RootStateType, StoreType} from "./components/Redax/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";




export const  rerenderEntireTree =(props: RootStateType)=> {
    ReactDOM.render(
        <BrowserRouter>
            <App store = {store}/>
        </BrowserRouter>,
        document.getElementById('root'));
}

rerenderEntireTree(store.getState());
//@ts-ignore
store.subscribe(rerenderEntireTree);
