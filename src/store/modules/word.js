import { save } from '@/api/cut.js'
import { save as saveReview } from '@/api/review.js'
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
      save(state.getters.cuts[0].wordId).then(res => {
        console.log('添加成功', res)
        state.commit('REMOVE_CUTS')
      })
    },
    saveNext(state) {
      saveReview(state.getters.nexts).then(res => {
        console.log('加入复习单词本', res)
        state.commit('REMOVE_NEXTS')
      })
    }
  }
}

export default data
