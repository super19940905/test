import request from './request'

export function loginApi(params) {
    return request({
        method: 'get',
        url: '/login/check',
        params: params
    })
}

export function developerApi(data) {
    return request({
        method: 'post',
        url: '/cerfiticate/save',
        data
    })
}