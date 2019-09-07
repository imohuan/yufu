import router from './router'
// import NProgress from 'nprogress'
//
// NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  // NProgress.start()
  // NProgress.done()
  next()
})
