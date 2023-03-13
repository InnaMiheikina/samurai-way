import React from 'react';
import s from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Setting from "./components/Setting/Setting";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/usersContainer";
import ProfileContainer from "./components/Profile/profileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./Redux/app-reducer";
import {AppStateType} from "./Redux/redux-store";
import Preloader from "./components/common/Preloader";


export type AppPropsType =  mapDispatchPropsType & mapStateToPropsType

class App extends React.Component <AppPropsType>{
    componentDidMount() {
    this.props.initializeAppTC()
    }
    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <div className={s.wrapper}>
                <HeaderContainer/>
                <Navbar/>
                <div className={s.app_wrapper_content}>
                    <Route path='/' render={() => <Redirect to={'/profile'}/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/setting' render={() => <Setting/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}
type mapDispatchPropsType = {
    initializeAppTC:() => void
}

type mapStateToPropsType = {
    initialized:boolean
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        initialized:state.app.initialized,
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeAppTC}))(App);

type SamuraiJSAppType={
    store:any
}
const SamuraiJSApp = ({store}:SamuraiJSAppType)=> {
   return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp;
