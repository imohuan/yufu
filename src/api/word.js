import req from '@/utils/request'
import store from '@/store/index.js'

/* 获取单词详情*/
export function get(data) {
  const words = store.getters.wordme
  let word = false
  words.forEach(f => {
    if (f.id === data.id) {
      word = f
    }
  })
  if (word !== false) {
    return new Promise((resolve, reject) => {
      resolve(word)
    })
  }
  return req({
    url: '/word/',
    method: 'get',
    params: data
  })
}

/* 删除单词*/
export function del(data) {
  return req({
    url: '/word/del',
    method: 'delete',
    data
  })
}

/* 编辑单词*/
export function edit(data) {
  return req({
    url: '/word/edit',
    method: 'put',
    data
  })
}

/* 保存单词*/
export function save(data) {
  return req({
    url: '/word/save',
    method: 'post',
    data
  })
}

/* 查询*/
export function page(data) {
  return req({
    url: '/word/page',
    method: 'post',
    data
  })
}

/* 随机单词*/
export function randomWord(data) {
  return req({
    url: '/word/random',
    method: 'get',
    params: { num: data }
  })
}

