import s from "./Posts.module.css";
import React from "react";



function Posts () {
    return (
            <div  className={s.item} >
                <img src='http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTKNZUrzz-CPQOD72Oc_nWfaQA6sx7tLbuw8nL6YzXBkBX8o7GMJ0thF8t5nAcS' />
                post 1
                <div>
                <span>like</span>
                </div>
            </div>

    )
}
export default Posts;