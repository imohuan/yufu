'use strict'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({ baseURL: '/search' })

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.err) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response.data.msg
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
