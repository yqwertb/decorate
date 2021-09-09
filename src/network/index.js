import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8888/api/private/v1/',
        timeout: 5000,
    });

    instance.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.reject(error.request)
    });

    instance.interceptors.response.use(res => {
        return res
    },error => {
        return error.response
    });

    return instance(config);
}