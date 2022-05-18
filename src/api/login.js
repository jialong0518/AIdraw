import request from '@/utils/request'

export function login(params) {
    return request({
        url: '/gkzy-web-service/student/login',
        method: 'post',
        params
    })
}

export function imgCode() {
    return request({
        url: '/gkzy-web-service/image-verifycode',
        method: 'get',
    })
}

export function smsLogin(params) {
    return request({
        url: '/gkzy-web-service/sms/sendLoginVerifyCodeNew',
        method: 'post',
        params
    })
}

export function codeLogin(params) {
    return request({
        url: '/gkzy-web-service/student/codeLogin',
        method: 'post',
        params
    })
}

export function findsms(params) {
    return request({
        url: '/gkzy-web-service/sms/sendVerifyCodeTempNew',
        method: 'post',
        params
    })
}

export function forgetPwd(params) {
    return request({
        url: '/gkzy-web-service/student/forgetPwd',
        method: 'post',
        params
    })
}


export function registersms(params) {
    return request({
        url: '/gkzy-web-service/sms/sendVerifyCodeNew',
        method: 'post',
        params
    })
}

export function userRegister(params) {
    return request({
        url: '/gkzy-web-service/student/register',
        method: 'post',
        params
    })
}







