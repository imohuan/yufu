import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './icons'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import './permisson'
import './filters'
import './directives/translate'
import './directives/splitTranslate'
import './styles/index.scss'
import './styles/main.scss'
import './styles/media.scss'
import './styles/layout.scss'
import 'animate.css'
import 'bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
