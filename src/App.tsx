import React from 'react';
import s from "./App.module.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Setting from "./components/Setting/Setting";
import {StoreType} from './../src/components/Redax/state';

type AppProps = {
    store: StoreType
}

const App: React.FC<AppProps> = (props) => {
    const state = props.store.getState();
    return (
        <BrowserRouter>
            <div className={s.wrapper}>
                <Header/>
                <Navbar/>
                <div className={s.app_wrapper_content}>
                    <Route path="/dialogs" render={() => <Dialogs dialogs={state.dialogsPage.dialogs}
                                                                  messages={state.dialogsPage.messages}/>}/>
                    <Route path="/profile" render={() => <Profile posts={state.profilePage.posts}
                                                                  dispatch={props.store.dispatch.bind(props.store)}
                                                                 /* updateNewPostText={props.store.updateNewPostText.bind(props.store)}*/
                                                                  newPostText={state.profilePage.newPostText}/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/setting" render={() => <Setting/>}/>

                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;