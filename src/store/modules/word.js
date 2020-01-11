// import { save } from '@/api/cut.js'
// import { save as saveReview } from '@/api/review.js'
// todo save store
import { add_word } from '../../api/info'
import { getToken } from '../../utils/auth'

const data = {
  namespaces: true,
  state: {
    cuts: [],
    nexts: [],
    words: [],
    wordme: []
  },
  mutations: {
    ADD_CUTS: (state, value) => {
      let bol = false
      state.cuts.forEach(c => {
        if (c.code === value.code) {
          bol = true
        }
      })
      if (!bol) { state.cuts.push(value) }
    },
    ADD_NEXTS: (state, value) => {
      state.nexts.push(value)
    },
    REMOVE_CUTS: (state) => {
      state.cuts = []
    },
    REMOVE_NEXTS: (state) => {
      state.nexts = []
    },
    ADD_WORD: (state, value) => {
      const bool = !state.words.find(f => {
        console.log(f.code.toLowerCase(), value.code.toLowerCase())
        return f.code.toLowerCase() === value.code.toLowerCase()
      })
      console.log(bool)
      if (bool) state.words.push(value)
    },
    ADD_WORDME: (state, value) => {
      const bool = !state.wordme.find(f => {
        return f.code.toLowerCase() === value.code.toLowerCase()
      })
      if (bool) state.wordme.push(value)
    }
  },
  actions: {
    saveCut(state) {
      const word = state.getters.cuts[state.getters.cuts.length - 1]
      add_word({ code: word.code, word_id: word.wordId, user_id: getToken(), type: 2 }).then(res => {
        console.log('加入cut')
        state.commit('REMOVE_CUTS')
      })
    },
    saveNext(state) {
      const word = state.getters.nexts[state.getters.nexts.length - 1]
      add_word({ code: word.code, word_id: word.wordId, user_id: getToken() }).then(res => {
        console.log('加入复习')
        state.commit('REMOVE_CUTS')
      })
    }
  }
}

export default data
