import axios from "axios";


const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '889efeee-d272-4bee-a801-da78b7c50fcc'
    },
});//вспомогательая ф-я axios

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}



export const getUsers2 = (currentPage:number, pageSize:number)=> {
    return  instance.get(`follow?page=${currentPage}&count=${pageSize}`,
        )
        .then(response=>response.data)
}
