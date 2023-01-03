import React from 'react';
import s from './Paaginator.module.css'


type PaginatorPropsType = {
    currentPage: any
    onPageChanged: any
    totalUsersCount: any
    pageSize: any
}

export const Paginator = ({currentPage,onPageChanged,totalUsersCount,pageSize}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)//округляем к большему количество страниц
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map(p => {
            return <span className={currentPage === p ? s.selectedPage : ''}
                         onClick={() => onPageChanged(p)}>{p}</span>
        })}
    </div>
}