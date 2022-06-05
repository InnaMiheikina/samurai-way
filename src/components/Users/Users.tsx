import React from 'react';
import s from './Users.module.css'
import { UsersPropsType} from "./usersContainer";
import axios from "axios";
import foto from './../../assets/images/pfoto.png'


const Users = (props: UsersPropsType) => {
    if (props.usersPage.users.length===0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
            props.setUsers(response.data.items)
        })
    }
    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                        <img src={u.photos.small!=null ? u.photos.small : foto } className={s.userPhoto}/>
                            </div>
                        <div>
                            {u.followed
                                ? <button onClick={()=> {props.unfollow(u.id)}}>unFollow</button>
                                : <button onClick={()=> {props.follow(u.id)}}>Follow</button>}
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