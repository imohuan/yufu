import Vue from 'vue'
import { debounce } from '../utils'
import state from '../store/index.js'
const baseApi = '/search'
Vue.directive('translate', {
  inserted: function(el, bind) {
    el.classList.add('v-print')
    const AudioPlay = debounce(function() {
      state.commit('PLAY_AUDIO', `${baseApi}/voice/${el.innerText}`)
    }, 200)
    window.getSelection ? window.getSelection().toString()
      : document.selection.createRange().text
    el.onclick = function() {
      AudioPlay()
    }
    el.ontouchstart = function() {
      AudioPlay()
    }
  }
})
