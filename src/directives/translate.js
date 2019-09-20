import Vue from 'vue'
import { debounce } from '../utils'
import { getTranslate } from '../api/voice'

Vue.directive('translate', {
  inserted: function(el, bind) {
    el.classList.add('v-print')
    const AudioPlay = debounce(function() {
      new Audio(`http://localhost:2000/web/v1/voice/?nr=${el.innerText}`).play()
    }, 200)
    window.getSelection ? window.getSelection().toString()
      : document.selection.createRange().text
    el.onclick = function() {
      AudioPlay()
    }
  }
})
