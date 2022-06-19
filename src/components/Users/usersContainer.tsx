import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";
import {Dispatch} from "redux";
import Users from "../Users/Users";
import {
    followAC,
    InitialUsersStateType,
    setCurrentPageAC, setIsFetchingAC,
    setUsersAC, setUsersTotalCountAC,
    unfollowAC,
    UsersType
} from "../Redux/users-reducer";
import axios from "axios";
import preloader from './../../assets/images/preloader.gif'
import Preloader from "../common/Preloader";

type MapStatePropsType = {
    usersPage: InitialUsersStateType
}
export type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching:(isFetching:boolean)=> void
}
export type UsersPropsType = MapStatePropsType & mapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)//preloader
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)//убрать
                this.props.setUsers(response.data.items)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)//preloader
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)//убрать
                this.props.setUsers(response.data.items);//users
                this.props.setTotalUsersCount(response.data.totalCount);//страницы
            });
    }

    render() {
        return <div>
            {this.props.usersPage.isFetching ? <Preloader /> : null}
            <Users usersPage={this.props.usersPage}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
            />
        </div>
    };
}


const mapStateToProps = (state: AppStateType): MapStatePropsType =>
{
    return {
        usersPage: state.usersPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType =>
{
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
        },
        toggleIsFetching:(isFetching:boolean)=> {
            dispatch(setIsFetchingAC(isFetching))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

