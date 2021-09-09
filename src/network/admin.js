import {request} from "./index";

export function adminList() {
    return request({
        url: '/users'
    })
}

export function addAdmin(userInfo) {
    let date = new Date(+new Date()+8*3600*1000).toISOString();
    userInfo = {
        ...userInfo,
        created: date,
        updated: date
    }
    return request({
        url: '/users/create',
        method: 'post',
        data: userInfo
    })
}

export function deleteAdmin(id) {
    let url = `/users/${id}`
    return request({
        url,
        method: 'delete',
    })
}

export function bundleDelete(ids) {
    let data= `[${ids}]`
    return request({
        url: '/users/bundleDelete',
        method: 'get',
        params: {
            ids: data
        },
    })
}