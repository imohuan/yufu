import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'

Vue.use(Router)
export const childrenRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首 页',
      icon: 'bookmark'
    }
  },
  {
    path: '/word',
    name: 'word',
    component: () => import('./views/word/'),
    meta: {
      title: '记单词',
      icon: 'notebook'
    }
  },
  {
    path: '/word_list',
    name: 'wordList',
    component: () => import('./views/manage/word'),
    meta: { title: '单词列表', icon: 'setup' }
  },
  {
    path: '/review_list',
    name: 'reviewList',
    component: () => import('./views/manage/review'),
    meta: { title: '单词记录', icon: 'edit-tools' }
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('./views/review/index'),
    meta: { title: '复习', icon: 'test' }
  }
]

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login/')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('./views/layout/Main'),
    children: childrenRoutes
  }
]

function parseRoute(routes) {
  return [].slice.call(routes).reduce((rs, r) => {
    if (r.meta && r.meta.children) {
      const children = Object.assign([], r.meta.children)
      delete r.meta.children
      rs.push(...parseRoute(children))
    }
    rs.push(r)
    return rs
  }, [])
}

const router = new Router({
  // mode: 'history',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: parseRoute(routes)
})

export default router
