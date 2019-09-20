import { getToken } from '@/utils/auth'

const data = {
  namespaces: true,
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN(state, value) {
      state.token = value
    },
    REMOVE_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
  }
}

export default data
