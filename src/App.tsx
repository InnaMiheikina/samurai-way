import React from 'react';
import s from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Setting from "./components/Setting/Setting";
import UsersContainer from "./components/Users/usersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {globalErrorAC, initializeAppTC} from "./Redux/app-reducer";
import {AppStateType} from "./Redux/redux-store";
import Preloader from "./components/common/Preloader";
import {withSuspense} from "./hoc/withSuspense";




const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/profileContainer'));


export type AppPropsType = mapDispatchPropsType & mapStateToPropsType

class App extends React.Component <AppPropsType> {

    catchAllUnhandledErrors = () => {
       globalErrorAC('Some error occurred 404')
    }

    componentDidMount() {
        this.props.initializeAppTC();
           window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        console.log(this.props.initialized, 'this.props.initialized')
        return (
            <div className={s.wrapper}>
                {this.props.error ?  <div className={s.error}>{this.props.error}</div> : ''}
                <HeaderContainer/>
                <Navbar/>
                <div className={s.app_wrapper_content}>
                    <Route>
                        <Route path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/setting' render={() => <Setting/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        {/*<Route path='/*' render={() => <div>404 NOT FOUND</div>}/>*/}
                    </Route>
                </div>
            </div>
        )
    }
}

type mapDispatchPropsType = {
    initializeAppTC:() => void
    globalErrorAC:(globalError:string)=>void
}
type mapStateToPropsType = {
    initialized: boolean,
    error:string | null

}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        initialized: state.app.initialized,
        error:state.app.globalError
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeAppTC,globalErrorAC}))(App);

type SamuraiJSAppType = {
    store: any
}
const SamuraiJSApp = ({store}: SamuraiJSAppType) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default SamuraiJSApp;

