import {request} from "./index";

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data: {...data}
    })
}


export function register(data) {
    let date = new Date(+new Date()+8*3600*1000).toISOString();
    return request({
        url: '/register',
        method: 'post',
        data: {
            ...data,
            created: date,
            updated: date
        }
    })
}
