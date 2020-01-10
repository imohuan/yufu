'use strict'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { setToken, getToken } from './auth'

const service = axios.create({
  baseURL: '/search'
  // timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['x-auth-token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      if (response.config.url.indexOf('/login') > 0) {
        const token = response.headers['x-auth-token']
        store.commit('SET_TOKEN', token)
        setToken(token)
      }
      return res.content
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
