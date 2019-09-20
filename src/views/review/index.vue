<template>
  <div class="container">
    <div v-if="wordType">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <panel-group :content="{ name: '今日复习', icon: 'bookmark', data: result.content && result.content.length || 0 }" />
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <panel-group :content="{ name: '进入复习', icon: 'test' }" @handlePanelGroupClick="goReview" />
        </el-col>
      </el-row>
      <div class="table" style="height: calc(100vh - 21.375rem);">
        <el-table
          v-loading="tableType"
          :data="result.content"
          height="100%"
          style="width: 100%"
        >
          <el-table-column align="center" width="150" label="单词">
            <template slot-scope="scope">
              <span v-translate class="code">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" prop="soundMark" label="音标">
            <template slot-scope="scope">{{ scope.row.soundMark | analysis }}</template>
          </el-table-column>
          <el-table-column align="center" label="解释">
            <template slot="header">
              <span @click="handleParaphraseAll">解释 - All</span>
            </template>
            <template slot-scope="scope">
              <span :class="{'paraphrase': true, 'hidden': scope.row.hidden}" @click="handleParaphrase(scope.$index, scope.row)">{{ scope.row.paraphrase }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="编辑">
            <template slot-scope="scope">
              <el-button type="primary" @click="details(scope.row)">详</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <ReviewWord v-else @word="HandlerWordType" />
  </div>
</template>

<script>
import PanelGroup from '@/components/PanelGroup/index'
import { page } from '@/api/review.js'
import { mapMutations } from 'vuex'
import ReviewWord from './word'

export default {
  name: 'Review',
  components: {
    PanelGroup,
    ReviewWord
  },
  data() {
    return {
      wordType: true,
      tableType: false,
      qo: {
        condition: {
          dayStatus: 1
        },
        page: 1,
        size: 300
      },
      result: {}
    }
  },
  mounted() {
    this.requests()
  },
  methods: {
    ...mapMutations(['WORD_ID_ALL']),
    requests() {
      page(this.qo).then(res => {
        res.content = res.content.map(m => {
          return { ...m, hidden: true }
        })
        this.result = res
      })
    },
    HandlerWordType() {
      this.wordType = true
    },
    goReview() {
      const content = Array.prototype.slice.call(this.result.content)
      if (content.length < 1) return
      const reviewId = content.map(m => m.id)
      const reviewIds = [...reviewId, ...reviewId]
      reviewIds.push(...reviewId.sort(() => Math.random() - 0.5))
      console.log(reviewIds)
      this.WORD_ID_ALL(reviewIds)
      this.wordType = false
    },
    details(row) {
      this.$router.push({ name: 'word', params: { w: row.wordId }})
    },
    handleParaphrase(index, row) {
      const hidden = !row.hidden
      const json = { ...row, hidden }
      this.result.content.splice(index, 1, json)
    },
    handleParaphraseAll() {
      const content = this.result.content
      let bool = false
      content.forEach(f => {
        if (f.hidden === true) {
          bool = true
        }
      })

      this.result.content = content.map(m => {
        return { ...m, hidden: !bool }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table {
    margin-top: 2rem;
  }
  .container {
    height: 100%;
  }
</style>
