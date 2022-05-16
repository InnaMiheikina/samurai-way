import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store, {RootStateType} from "./components/Redux/redux-store";
import {Store} from "redux";
import {Provider} from "react-redux";




export const  rerenderEntireTree = (store: Store<RootStateType>)=> {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root'));
}

rerenderEntireTree(store);

store.subscribe(() => rerenderEntireTree(store));
