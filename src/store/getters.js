const getters = {
  mainRoute: state => state.layout.mainRoute,
  opened: state => state.layout.sidebar.opened,
  withoutAnimation: state => state.layout.sidebar.withoutAnimation,
  device: state => state.layout.device,

  cuts: state => state.word.cuts,
  nexts: state => state.word.nexts,
  words: state => state.word.words,
  wordme: state => state.word.wordme,

  token: state => state.user.token,

  reviewId: state => state.review.reviewId
}

export default getters
