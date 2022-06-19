import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./usersContainer";
import axios from "axios";
import foto from './../../assets/images/pfoto.png'


class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }
    onPageChanged = (pageNumber:number)=> {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);//users
                this.props.setTotalUsersCount(response.data.totalCount);//страницы

            });
    }

    render() {
        let pagesCount = Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize )//округляем к большему количество страниц
        let pages = [];
        for (let i=1; i <= pagesCount; i++){
            pages.push(i)
        }
        return (
            <div>
                <div>
                    { pages.map( p => {
                     return   <span className={this.props.usersPage.currentPage ===p ? s.selectedPage : ''}
                                    onClick={()=> this.onPageChanged(p)}>{p}</span>
                    })}
                </div>
                {
                    this.props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                        <img src={u.photos.small != null ? u.photos.small : foto} className={s.userPhoto}/>
                            </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>unFollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}

export default Users;