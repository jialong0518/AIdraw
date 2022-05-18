import request from '@/utils/request'

export function getProvince() {
    return request({
      url: '/gkzy-web-service/collegeBrief/getCollegeAreasLevel1',
      method: 'get',
    //   params: { token }
    })
}

export function getSchoolType() {
    return request({
      url: '/gkzy-web-service/collegeBrief/getCollegeType',
      method: 'get',
    //   params: { token }
    })
}

export function getSchoolGrade() {
    return request({
      url: '/gkzy-web-service/collegeBrief/getCollegeFLag',
      method: 'get',
    //   params: { token }
    })
}

export function getEducationGrade() {
    return request({
      url: '/gkzy-web-service/collegeBrief/getCollegeEducationLevel',
      method: 'get',
    //   params: { token }
    })
}

//字典表
export function getDictionary(params) {
  return request({
    url: '/gkzy-web-service/dict/item/typeId',
    method: 'get',
    params
  })
}









