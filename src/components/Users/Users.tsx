import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./usersContainer";
import foto from './../../assets/images/pfoto.png'
import { NavLink } from 'react-router-dom';
import axios from "axios";

type PropsType = {
    usersPage: UsersPropsType['usersPage']
    follow: UsersPropsType['follow']
    unfollow: UsersPropsType['unfollow']
    onPageChanged: (p: number) => void
}

const Users = (props: PropsType) => {
    let pagesCount = Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize)//округляем к большему количество страниц
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.usersPage.currentPage === p ? s.selectedPage : ''}
                                 onClick={() => props.onPageChanged(p)}>{p}</span>
                })}
            </div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id} >
                        <img src={u.photos.small != null ? u.photos.small : foto} className={s.userPhoto}/>
                                </NavLink>
                            </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials:true ,
                                        headers: {
                                            'API-KEY': '889efeee-d272-4bee-a801-da78b7c50fcc'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode===0) {
                                                props.unfollow(u.id)
                                            }
                                        });
                                   }}>unFollow</button>
                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{}, {
                                        withCredentials:true ,
                                        headers: {
                                            'API-KEY': '889efeee-d272-4bee-a801-da78b7c50fcc'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode===0) {
                                                props.follow(u.id)
                                            }
                                        });
                                   }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                        <div>{u.name}</div>
                            <div>{u.status}</div>
                            </span>
                        <span>
                        <div>{'u.location.city'}</div>
                            <div>{'u.location.country'}</div>
                            </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;