import req from '@/utils/request'
import { getToken } from '@/utils/auth'
/* 获取用户信息*/
export function getInfo() {
  return req({
    url: `/info/${getToken()}`,
    method: 'get'
  })
}

/* record list */
export function list(data) {
  return req({
    url: `/info/list/${getToken()}`,
    method: 'post',
    data
  })
}

/* review record list */
export function review_list(data) {
  return req({
    url: `/info/review_list/${getToken()}`,
    method: 'post',
    data
  })
}

/* update type  record id*/
export function update_word(data) {
  return req({
    url: `/info/update_word`,
    method: 'post',
    data
  })
}

/* update type  record id by user id */
export function update_word_by_user_id(data) {
  return req({
    url: `/info/update_word_by_user_id`,
    method: 'post',
    data
  })
}

/* add word  */
export function add_word(data) {
  return req({
    url: `/info/add_word`,
    method: 'post',
    data
  })
}

