import req from '@/utils/request'
import $ from 'jquery'
import sha256 from 'sha256'
import { Message } from 'element-ui'
import store from '@/store/index.js'

export function getTranslate(data) {
  return req({
    url: `/voice/translate/${data}`,
    method: 'get'
  })
}

export function youdao(data) {
  const appKey = '5431417725bcd11f'
  const salt = (new Date()).getTime()
  const curtime = Math.round(new Date().getTime() / 1000)
  const key = 'jeFCi5MsNFxL3gpTtptx3taB0O1oNuTZ'
  const sign = sha256(appKey + data + salt + curtime + key)

  const words = store.getters.words
  let word = false
  words.forEach(f => {
    if (f.code.toLowerCase() === data.toLowerCase()) {
      word = f
    }
  })
  return new Promise((resolve, reject) => {
    if (word !== false) {
      resolve(word)
    } else {
      $.ajax({
        url: 'http://openapi.youdao.com/api',
        method: 'post',
        dataType: 'jsonp',
        data: {
          q: data,
          appKey,
          salt,
          from: 'en',
          to: 'zh-CHS',
          sign,
          signType: 'v3',
          curtime
        },
        success: function(res) {
          if (res.errorCode > 0) {
            reject(res)
          }

          const result = {
            code: res.returnPhrase[0],
            phoentic: res.basic.phonetic,
            explains: res.basic.explains
          }
          store.commit('ADD_WORD', result)
          resolve(result)
        },
        error: function(msg) {
          reject(msg)
        }
      })
    }
  }).catch((e) => {
    Message({
      message: e || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
  })
}
