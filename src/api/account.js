import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'get',
    data
  })
}

export function picresult(data) {
  return request({
    url: '/aipic/picresult',
    method: 'post',
    data
  })
}

export function picfinish(data) {
  return request({
    url: '/aipic/finish',
    method: 'post',
    data
  })
}

export function playerstatus(data) {
  return request({
    url: '/aipic/playerstatusupd',
    method: 'post',
    data
  })
}

export function sendmsg(data) {
  return request({
    url: '/aipic/sendmsg?openid='+data,
    method: 'get',
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


  


  


