import req from '@/utils/request'

export function page(data) {
  return req({
    url: '/remember/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return req({
    url: '/remember/save',
    method: 'get',
    params: { wordId: data }
  })
}

export function del(data) {
  return req({
    url: '/remember/del',
    method: 'delete',
    params: { id: data }
  })
}
