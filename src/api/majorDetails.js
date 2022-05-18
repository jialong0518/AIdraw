import request from '@/utils/request'

export function getMajorInfor(params) {
    return request({
      url: '/gkzy-web-service/majorInfo/getMajorInfoByMajorCode',
      method: 'get',
      params
    })
}

export function getOccupation(params) {
    return request({
      url: '/gkzy-web-service/employJobirection/getListByMajorCode',
      method: 'get',
      params
    })
}

export function getIndustry(params) {
    return request({
      url: '/gkzy-web-service/empIndustryDirection/getListByMajorCode',
      method: 'get',
      params
    })
}

export function getRegion(params) {
    return request({
      url: '/gkzy-web-service/empRegionDirection/getListByMajorCode',
      method: 'get',
      params
    })
}



