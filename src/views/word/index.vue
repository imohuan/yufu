<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div v-loading="wordType" class="col-md-12 col-xs-12 h-100">
        <div class="center flex-row bd-highlight">
          <h2 style="color:#65c037;"> <span v-translate>{{ content.code }}</span> </h2>
          <span style="color:#adafb0">{{ content.soundMark | analysis }}</span>
          <span style="color: #de8677">{{ content.paraphrase }}</span>
          <span style="color: #aada9b">{{ content.comprehensive }}</span>
          <span style="color: #717371">{{ content.association }}</span>
          <div v-splitTranslate="content.example" class="translation" style="color: #7fc5eb" />
          <span style="color: #717371">{{ content.translate }}</span>
        </div>
        <div class="bottom">
          <div class="float-left">
            <el-button type="primary" @click="pren">上一个</el-button>
          </div>
          <div class="float-right">
            <el-button class="cut" type="success" @click="cut">斩</el-button>
            <el-button type="primary" @click="next">下一个</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/api/word.js'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Word',
  data() {
    return {
      id: 1,
      wordType: false,
      content: {}
    }
  },
  mounted: function() {
    this.id = this.$route.query.w || 1
    this.requests()
  },
  beforeRouteEnter(to, from, next) {
    const id = to.params.w
    next(vm => {
      if (id > 0) {
        vm.id = id
        vm.requests()
        vm.$router.push({ query: { w: id }})
      }
    })
  },
  methods: {
    ...mapMutations(['ADD_CUTS', 'ADD_NEXTS', 'ADD_WORDME']),
    ...mapActions(['saveCut', 'saveNext']),
    requests(bool) {
      this.wordType = true
      get({ id: this.id }).then(async res => {
        this.ADD_WORDME(res)
        this.content = res
        this.wordType = false
      })
    },
    pren() {
      this.id--
      this.$router.push({ query: { id: this.id }})
      this.requests()
    },
    cut() {
      const cont = this.content
      this.ADD_CUTS({
        wordId: cont.id,
        code: cont.code,
        soundMark: cont.soundMark,
        paraphrase: cont.paraphrase
      })
      this.saveCut()
      this.nexts()
    },
    next() {
      const cont = this.content
      this.ADD_NEXTS({
        wordId: cont.id,
        code: cont.code,
        soundMark: cont.soundMark,
        paraphrase: cont.paraphrase
      })
      this.nexts()
      this.saveNext()
    },
    nexts() {
      this.id++
      this.$router.push({ query: { w: this.id }})
      this.requests()
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  position: relative;
  .bottom {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
    .cut {}
  }
}
.center {
  text-align: center;
  padding: 2rem 0;
  margin-top: 1rem;
  & > * {
    display: block;
  }
  h2 {
    span:first-child {
      font-size: 6rem;
    }
  }
  & > span:nth-of-type(2) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  & > span:nth-of-type(3) {
    font-size: 0.98rem;
    letter-spacing: 0.24rem;
    line-height: 2rem;
  }
  & > span:nth-of-type(4) {
    font-size: 0.98rem;
    letter-spacing: 0.24rem;
    margin-bottom: 2rem;
  }

  .translation {
    width: 90%;
    margin: 0 auto;
    word-wrap: break-word;
    font-size: 1.6rem;
    display: block;
    position: relative;
  }
}
</style>
