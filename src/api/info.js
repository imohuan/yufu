import req from '@/utils/request'

/* 获取用户信息*/
export function getInfo() {
  return req({
    url: '/info/',
    method: 'get'
  })
}

/* 设置用户信息*/
export function setInfo(data) {
  return req({
    url: '/info/update',
    method: 'get',
    data
  })
}
