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
          <el-table-column align="center" label="解释">
            <template slot="header">
              <span @click="handleParaphraseAll">解释 - All</span>
            </template>
            <template slot-scope="scope">
              <span :class="{'paraphrase': true, 'hidden': scope.row.hidden}" @click="handleParaphrase(scope.$index, scope.row)">{{ scope.row.paraphrase }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="综合法" prop="comprehensive" />
          <el-table-column align="center" label="联想法" prop="association" />
          <el-table-column align="center" width="60" label="等级">
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.grade }}</el-tag>
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
import { mapMutations } from 'vuex'
import ReviewWord from './word'
import { review_list, update_word_by_user_id } from '@/api/info'
import { getToken } from '../../utils/auth'

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
      review_list(this.qo).then(res => {
        this.result = {
          totalElements: res.cont,
          totalPages: res.max_page,
          content: res.data.map(m => {
            return { ...m, hidden: true }
          })
        }
      })
    },
    HandlerWordType(data) {
      this.wordType = true
      update_word_by_user_id({ user_id: getToken(), word_id: data.id }).then(res => {
        console.log(12, res)
      })
      this.requests()
    },
    goReview() {
      const content = Array.prototype.slice.call(this.result.content)
      if (content.length < 1) return
      console.log(content)
      const reviewId = content.map(m => m.word_id)
      const reviewIds = [...reviewId, ...reviewId]
      reviewIds.push(...reviewId.sort(() => Math.random() - 0.5))
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
