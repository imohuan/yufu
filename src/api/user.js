import req from '@/utils/request'

export function login(data) {
  return req({
    url: '/login',
    method: 'post',
    data
  })
}
