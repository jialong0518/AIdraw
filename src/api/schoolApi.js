import request from '@/utils/request'

export function getSchoolTable(params) {
    return request({
      url: '/gkzy-web-service/collegeBrief/getCollegeByPage',
      method: 'get',
      params
    })
}

export function getCollegeCompare(params) {
  return request({
    url: '/gkzy-web-service/collegeBrief/getCollegeCompare',
    method: 'get',
    params
  })
}

export function getCollegeInfor(params) {
  return request({
    url: '/gkzy-web-service/collegeBrief/getCollegeById',
    method: 'get',
    params
  })
}





