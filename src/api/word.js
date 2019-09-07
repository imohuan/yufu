import requests from '@/plugins/axios.js'

/* 获取单词详情*/
export function get(data) {
  return requests({
    url: '/word',
    methods: 'get',
    data
  })
}

/* 删除单词*/
export function del(data) {
  return requests({
    url: '/word/del',
    methods: 'delete',
    data
  })
}

/* 编辑单词*/
export function edit(data) {
  return requests({
    url: '/word/edit',
    methods: 'put',
    data
  })
}

/* 保存单词*/
export function save(data) {
  return requests({
    url: '/word/save',
    methods: 'post',
    data
  })
}

/* 查询*/
export function page(data) {
  return request({
    url: '/word/page',
    methods: 'post',
    data
  })
}
