import request from '@/utils/request'

export function getProvince(params) { //个人中心 - 获取省份
  return request({
    // url: '/gkzy-web-service/batchLine/getAllProvinceList',
    url: '/gkzy-web-service/dict/item/typeId',
    method: 'get',
    params
  })
}

export function getCity(params) { //个人中心 - 获取城市
  return request({
    url: '/gkzy-web-service/sysareas/getSysAreasByParentAreaNo',
    method: 'get',
    params
  })
}

export function upFile(params) { //个人中心 - 上传头像
  return request({
    url: '/gkzy-web-service/upload/uploadFile',
    method: 'post',
    data: params
    
  })
}

export function getStu(params) { //个人中心 - 获取学生详情
  return request({
    url: '/gkzy-web-service/student/getStu',
    method: 'get',
    params
  })
}

export function updateStuImgUrl(params) { //个人中心 - 获取学生详情
  return request({
    url: '/gkzy-web-service/student/updateStuImgUrl',
    method: 'post',
    params
  })
}

export function perfectStuInfo(params) { //个人中心 - 提交修改
  return request({
    url: '/gkzy-web-service/student/perfectStuInfo',
    method: 'post',
    params
  })
}

export function updatePassword(params) { //个人中心 - 修改密码
  return request({
    url: '/gkzy-web-service/student/updatePassword',
    method: 'post',
    params
  })
}

export function getProvinceNo(params) { //个人中心 - 根据省份获得选科
  return request({
    url: '/gkzy-web-service/provinceSub/getProvinceNo',
    method: 'get',
    params
  })
}

export function getParagraphByScore(params) { //个人中心 - 根据成绩得到学生排位
  return request({
    url: '/gkzy-web-service/scoreparagraph/getParagraphByScore',
    method: 'get',
    params
  })
}

export function submitScoreInfo(params) { //个人中心 - 完善学生成绩
  return request({
    url: '/gkzy-web-service/student/perfectStuScoreInfo',
    method: 'POST',
    params
  })
}

export function getScoreInfo(params) { //个人中心 - 判断是否完善
  return request({
    url: '/gkzy-web-service/student/getStu',
    method: 'POST',
    params
  })
}



























