import req from '@/utils/request'

export function page(data) {
  return req({
    url: '/review/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return req({
    url: '/review/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return req({
    url: '/review/update',
    method: 'put',
    params: { id: data }
  })
}

export function del(data) {
  return req({
    url: '/review/del',
    method: 'delete',
    params: { id: data }
  })
}
