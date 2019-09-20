import router from './router'
import store from './store/index'
import { getToken } from './utils/auth'

router.beforeEach(async(to, from, next) => {
  store.commit('SET_MAIN_ROUTE', to.path)
  if (store.getters.token !== undefined && getToken() !== undefined) {
    next()
  } else {
    if (to.path === '/login') next()
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})

