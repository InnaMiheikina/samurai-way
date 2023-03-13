import React, {useState} from 'react';
import s from './Paaginator.module.css'


type PaginatorPropsType = {
    currentPage: any
    onPageChanged: any
    totalItemsCount: any
    pageSize: any
    portionSize:number
}

export const Paginator = ({currentPage,onPageChanged,totalItemsCount,pageSize,portionSize=10}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)//округляем к большему количество страниц
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount=Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber]=useState(1);
    let leftPortionPageNumber = (portionNumber-1)*portionSize+1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return <div className={s.paginator}>
        {portionNumber > 1 &&
            <button onClick={()=>{setPortionNumber(portionNumber-1 )}}> PREV</button>}
        {pages
            .filter(p => p>=leftPortionPageNumber && p<=rightPortionPageNumber)
            .map(p => {
            return <span className={currentPage === p ? s.selectedPage : ''}
                         onClick={() => onPageChanged(p)}>{p}</span>
        })}
        {portionCount > portionNumber &&
        <button onClick={()=> setPortionNumber(portionNumber + 1)}>NEXT</button>}
    </div>
}