import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./usersContainer";
import foto from './../../assets/images/pfoto.png'
import {NavLink} from 'react-router-dom';
import {UserType} from "../../Redux/users-reducer";

type UserPropsType = {
    user: UserType
    followingInProgress: any[]
    follow: UsersPropsType['follow']
    unfollow: UsersPropsType['unfollow']
}

export const User = ({user, followingInProgress, follow, unfollow}: UserPropsType) => {
    return (
        <div>
            <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : foto} className={s.userPhoto}/>
                                </NavLink>
                            </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}
                                >unFollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}
                                >Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                        <div>{user.name}</div>
                            <div>{user.status}</div>
                            </span>
                        <span>
                        <div>{'u.location.city'}</div>
                            <div>{'u.location.country'}</div>
                            </span>
                    </span>
        </div>)
}
