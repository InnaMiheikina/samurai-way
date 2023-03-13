import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import {store} from "./Redux/redux-store";
import SamuraiJSApp from "./App";


    ReactDOM.render(
        <SamuraiJSApp store={store}/>
        ,
        document.getElementById('root'));
