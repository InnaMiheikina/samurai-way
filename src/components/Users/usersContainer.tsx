import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";
import Users from "../Users/Users";
import {
    follow,
    InitialUsersStateType,
    setCurrentPage, setIsFetching, setTotalUsersCount,
    setUsers,
    unfollow,
    UsersType
} from "../Redux/users-reducer";
import axios from "axios";
import Preloader from "../common/Preloader";

type MapStatePropsType = {
    usersPage: InitialUsersStateType
}
 type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setIsFetching:(isFetching:boolean)=> void
}
export type UsersPropsType = MapStatePropsType & mapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)//preloader
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)//убрать
                this.props.setUsers(response.data.items)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setIsFetching(true)//preloader
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)//убрать
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setIsFetching
})(UsersContainer);

