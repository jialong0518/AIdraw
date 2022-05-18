import request from '@/utils/request'

export function getSearchTerm(params) {
    return request({
      url: '/gkzy-web-service/majorType/getList',
      method: 'get',
      params
    })
}