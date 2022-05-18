import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function userlist(data) {
  return request({
    url: '/api/web/index.php?r=v1/apimgr/userlist',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function userAdd(data) {
  return request({
    url: '/api/web/index.php?r=v1/apimgr/useradd',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function passwordreset(data) {
    return request({
      url: '/api/web/index.php?r=v1/apimgr/passwordreset',
      method: 'post',
      // data: JSON.parse(data)
      data: JSON.stringify(data)
    })
  }

  export function userdel(data) {
    return request({
      url: '/api/web/index.php?r=v1/apimgr/userdel',
      method: 'post',
      // data: JSON.parse(data)
      data
    })
  }

  export function useredit(data) {
    return request({
      url: '/api/web/index.php?r=v1/apimgr/useredit',
      method: 'post',
      data
    })
  }

  export function userbind(data) {
    return request({
      url: '/api/web/index.php?r=v1/apimgr/userbind',
      method: 'post',
      data
    })
  }


  


  


