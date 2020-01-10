import req from '@/utils/request'

export function login(data) {
  return req({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return req({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function update(id) {
  return req({
    url: '/user/update',
    method: 'post',
    data: id
  })
}
