import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";
import {Dispatch} from "redux";
import Users from "../Users/Users";
import {
    followAC,
    InitialUsersStateType,
    setCurrentPageAC,
    setUsersAC, setUsersTotalCountAC,
    unfollowAC,
    UsersType
} from "../Redux/users-reducer";

type MapStatePropsType = {
    usersPage: InitialUsersStateType
}
export type mapDispatchPropsType ={
    follow:(userId:number)=> void
    unfollow:(userId:number)=> void
    setUsers:(users:UsersType[])=> void
    setCurrentPage:(pageNumber: number)=>void
    setTotalUsersCount:(totalCount: number)=>void
}
export type UsersPropsType = MapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
   usersPage: state.usersPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):mapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UsersType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;