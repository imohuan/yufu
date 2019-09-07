const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首 页',
      icon: 'bookmark'
    }
  },
  {
    path: '/word',
    name: 'word',
    meta: {
      title: '记单词',
      icon: 'notebook',
      children: [
        {
          path: '/word_manage',
          name: 'wordManage'
        }
      ]
    }
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

console.log(parseRoute(routes))
