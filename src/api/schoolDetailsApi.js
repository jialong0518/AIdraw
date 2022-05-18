import request from '@/utils/request'

export function getRegion(params) {
    return request({
      url: '/gkzy-web-service/collegeEntryScore/getEntryScoreParamArea',
      method: 'get',
      params
    })
}

export function getYear(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryScore/getEntryScoreParamYear',
    method: 'get',
    params
  })
}

export function getCourseType(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryScore/getEntryScoreParamExamineeType',
    method: 'get',
    params
  })
}

export function getEducationType(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryScore/getEntryScoreParamEntryBatch',
    method: 'get',
    params
  })
}

export function getHistoryScore(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryScore/getEntryScoreList',
    method: 'get',
    params
  })
}

export function getMajorData(params) {
  return request({
    url: '/gkzy-web-service/collegeMajor/getCollegeMajorList',
    method: 'get',
    params
  })
}

export function getRegionMajor(params) {
  return request({
    url: '/gkzy-web-service/collegeMajorEntryScore/getEntryScoreParamArea',
    method: 'get',
    params
  })
}

export function getYearMajor(params) {
  return request({
    url: '/gkzy-web-service/collegeMajorEntryScore/getEntryScoreParamYear',
    method: 'get',
    params
  })
}

export function getCourseTypeMajor(params) {
  return request({
    url: '/gkzy-web-service/collegeMajorEntryScore/getEntryScoreParamExamineeType',
    method: 'get',
    params
  })
}

export function getEducationTypeMajor(params) {
  return request({
    url: '/gkzy-web-service/collegeMajorEntryScore/getEntryScoreParamEntryBatch',
    method: 'get',
    params
  })
}

export function getMajorScore(params) {
  // /gkzy-web-service/collegeMajorEntryScore/getEntryScoreList
  return request({
    url: '/gkzy-web-service/collegeMajorEntryScore/getEntryScoreByPage',
    method: 'get',
    params
  })
}


export function getRegionPlan(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryPlan/getEntryPlanParamArea',
    method: 'get',
    params
  })
}

export function getYearPlan(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryPlan/getEntryPlanParamYear',
    method: 'get',
    params
  })
}

export function getCourseTypePlan(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryPlan/getEntryPlanParamEntryType',
    method: 'get',
    params
  })
}

export function getEducationTypePlan(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryPlan/getEntryPlanParamEntryBatch',
    method: 'get',
    params
  })
}

export function getPlanlist(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryPlan/getEntryPlanByPage',
    method: 'get',
    params
  })
}

export function getGeneralRules(params) {
  return request({
    url: '/gkzy-web-service/collegeEntryCharter/getEntryCharterList',
    method: 'get',
    params
  })
}

export function getJobWhere(params) {
  return request({
    url: '/gkzy-web-service/collegeJob/getJobList',
    method: 'get',
    params
  })
}



















