import request from '@/utils/request'

export function getProvince(params) { //批次线 - 获取省份
  return request({
    url: '/gkzy-web-service/batchLine/getAllProvinceList',
    method: 'get',
    params
  })
}

export function getYear(params) { //批次线 - 获取年份
  return request({
    url: '/gkzy-web-service/batchLine/getAllYearList',
    method: 'get',
    params
  })
}

export function getDefaultList(params) { //批次线 - 获取默认值
  return request({
    url: '/gkzy-web-service/batchLine/getDefaultList',
    method: 'get',
    params
  })
}

export function getList(params) { //批次线 - 获取批次线
  return request({
    url: '/gkzy-web-service/batchLine/getList',
    method: 'get',
    params
  })
}

export function getExpert(params) { //高考专家
  return request({
    url: '/gkzy-web-service/expert/listByPage',
    method: 'get',
    params
  })
}

export function getView(params) { //专家详情
  return request({
    url: '/gkzy-web-service/expert/view',
    method: 'get',
    params
  })
}

export function saveConsult(params) { //信息咨询
  return request({
    url: '/gkzy-web-service/expert/saveStuExpert',
    method: 'get',
    params
  })
}

export function getAssDefault(params) { //学科评估 - 获取默认值
  return request({
    url: '/gkzy-web-service/assessment/getDefaultList',
    method: 'get',
    params
  })
}

export function getAsslist(params) { //学科评估 - 获取一二级列表
  return request({
    url: '/gkzy-web-service/assessment/list',
    method: 'get',
    params
  })
}

export function getListByPage(params) { //学科评估 - 获取表格数据
  return request({
    url: '/gkzy-web-service/assessment/listByPage',
    method: 'get',
    params
  })
}

export function getRankingList(params) { //学校排行榜
  return request({
    url: '/gkzy-web-service/ranking/listByPage',
    method: 'get',
    params
  })
}

export function getScoreDefault(params) { //一分一段表 - 获取默认值
  return request({
    url: '/gkzy-web-service/scoreparagraph/getDefaultList',
    method: 'get',
    params
  })
}

export function getStatisticsList(params) { //一分一段表 - 获取折线图
  return request({
    url: '/gkzy-web-service/scoreparagraph/getStatisticsList',
    method: 'get',
    params
  })
}

export function getAllList(params) { //一分一段表 - 获取省份，年份，学科类
  return request({
    url: '/gkzy-web-service/scoreparagraph/list',
    method: 'get',
    params
  })
}

export function getlistByPage(params) { //一分一段表 - 获取省份，年份，学科类
  return request({
    url: '/gkzy-web-service/scoreparagraph/listByPage',
    method: 'get',
    params
  })
}

























