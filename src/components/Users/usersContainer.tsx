import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import Users from "../Users/Users";
import {
    follow, getUsers,
    InitialUsersStateType,
    setCurrentPage, setIsFetching, setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    unfollow,
    UserType
} from "../../Redux/users-reducer";
import Preloader from "../common/Preloader";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import { getUsersSelector} from "../../Redux/users-selectors";


type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers:(currentPage:number, pageSize:number)=>void
}
export type UsersPropsType = MapStatePropsType & mapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        const {currentPage,pageSize} = this.props.usersPage
        this.props.getUsers(currentPage,pageSize )
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props.usersPage
        this.props.getUsers(pageNumber,pageSize)
    }

    render() {
        return <div>
            {this.props.usersPage.isFetching ? <Preloader/> : null}
            <Users usersPage={this.props.usersPage}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
            />
        </div>
    };
}

/*const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage,
    }
}*/
type MapStatePropsType = {
    usersPage: InitialUsersStateType
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: getUsersSelector(state)
    }
}
export  default compose <React.ComponentType> (
    connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
    setIsFetching, setTotalUsersCount,setUsers}),
    //withAuthRedirect,
    withRouter
)(UsersContainer);

