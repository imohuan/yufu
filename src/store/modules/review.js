import { update } from '@/api/review.js'

const data = {
  namespaces: true,
  state: {
    reviewId: []
  },
  mutations: {
    WORD_ID_ALL: (state, value) => {
      state.reviewId = value
    },
    ADD_REVIEW: (state, id) => {
      state.reviewId.push(id)
    },
    DELETE_REVIEW: (state) => {
      const id = state.reviewId[0]
      state.reviewId.shift()
      const bool = state.reviewId.find(f => f === id)
      if (!bool) {
        update(id).then(res => {
          console.log(`当前${id}单词复习成功! ${res}`)
        })
      }
    },
    FILTER_WORD: (state, id) => {
      const wordList = Array.prototype.slice.call(state.reviewId)
      state.reviewId = wordList.filter(f => f !== id)
    }
  },
  actions: {
  }
}

export default data
