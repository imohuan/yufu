import Vue from 'vue'
import { throttle } from '../utils'
import { youdao } from '@/api/voice.js'
import state from '../store/index.js'

const baseApi = '/search'
Vue.directive('splitTranslate', {
  inserted: function(el, bind) {
    el.classList.add('v-print')
    const fragment = document.createDocumentFragment()
    const div = document.createElement('div')
    div.classList = 'v-translation'
    div.innerHTML = `
        <div class="arrow"></div>
    `
    fragment.appendChild(div)
    document.body.appendChild(fragment)
  },
  update(el, bind) {
    const Hdiv = document.body.querySelector('.v-translation')
    const phrase = bind.value
    el.music = throttle(function() {
      state.commit('PLAY_AUDIO', `${baseApi}/voice/${phrase}`)
    }, 200)
    if (phrase == null) return
    const arry = phrase.match(/[a-zA-z]+/ig)
    const arr = Array.prototype.slice.call(arry)
    el.innerHTML = ''
    const fragment = document.createDocumentFragment()
    arr.forEach(en => {
      const span = document.createElement('span')
      span.innerText = en
      span.classList = 'v-span'
      span.music = throttle(function() {
        state.commit('PLAY_AUDIO', `${baseApi}/voice/${en}`)
      }, 1000)
      let timer = null
      span.onmouseenter = function() {
        clearTimeout(timer)
        SpanMoseOver(en, Hdiv, this)
      }
      span.onmouseleave = function() {
        timer = setTimeout(_ => {
          Hdiv.style.opacity = 0
        }, 3000)
      }
      span.onclick = function() {
        this.music()
      }
      fragment.appendChild(span)
    })
    const audio = document.createElement('div')
    audio.classList = 'audio'
    audio.innerHTML = `<svg t="1568307859642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3463" width="200" height="200"><path d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z" fill="" p-id="3464"></path></svg>
`
    audio.onclick = function() {
      el.music()
    }
    fragment.appendChild(audio)
    el.appendChild(fragment)
  }
})

function SpanMoseOver(en, Hdiv, _this) {
  youdao(en).then(res => {
    const detail = res

    Hdiv.innerHTML = `
              <h3>${detail.code}</h3><span class="phoentic">/${detail.phoentic}/</span>
              <p>${detail.explains.join('</br>')}</p>
              <div class="arrow"></div>
          `

    const last = Hdiv.querySelector('.arrow')
    const box = _this.getBoundingClientRect()
    const offset = -10
    let left = box.x - (Hdiv.offsetWidth / 2) + offset + (_this.offsetWidth / 2)
    if (left < 0) {
      // last.style.left = `calc(50% - ${Math.abs(left)}px)`
      left = 0
    }
    Hdiv.style.opacity = 1
    Hdiv.style.left = left + 'px'
    const availWidth = screen.availWidth
    const w = (Hdiv.offsetWidth + left) - availWidth
    if (w > 0) {
      Hdiv.style.left = 'unset'
      Hdiv.style.right = 0
    }
    // const last_left = _this.offsetLeft - Hdiv.offsetLeft + (_this.offsetWidth / 2) + offset
    // console.log(last_left, _this.offsetLeft, Hdiv.offsetLeft, (_this.offsetWidth / 2))
    // last.style.left = `${last_left}px`
    Hdiv.style.top = box.y - _this.offsetHeight - Hdiv.offsetHeight + 'px'
  })
}
