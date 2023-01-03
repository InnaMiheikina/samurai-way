import React from 'react';
import {UsersPropsType} from "./usersContainer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


type PropsType = {
    usersPage: UsersPropsType['usersPage']
    follow: UsersPropsType['follow']
    unfollow: UsersPropsType['unfollow']
    onPageChanged: (p: number) => void
}

const Users = (props: PropsType) => {
    return (
        <div>

            <Paginator currentPage={props.usersPage.currentPage} onPageChanged={props.onPageChanged}
                       totalUsersCount={props.usersPage.totalUsersCount} pageSize={props.usersPage.pageSize}/>
            <div>
                {
                    props.usersPage.users.map(u => <User user={u}
                                                         followingInProgress={props.usersPage.followingInProgress}
                                                         key={u.id}
                                                         unfollow={props.unfollow}
                                                         follow={props.follow}
                    />)
                }
            </div>
        </div>
    );
};

export default Users;