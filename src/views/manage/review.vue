<template>
  <div class="container">
    <div class="search">
      <div class="search-left">
        <el-menu :default-active="menuIndex" class="review-menu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" @click="reviewStart">已学单词</el-menu-item>
          <el-menu-item index="2" @click="cutStart">已斩单词</el-menu-item>
        </el-menu>
      </div>
      <div class="search-right" />
    </div>
    <div class="table">
      <el-table
        v-loading="tableType"
        :data="result.content"
        height="400"
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
        <el-table-column align="center">
          <template slot="header">
            <span @click="handleParaphraseAll">解释 - All</span>
          </template>
          <template slot-scope="scope">
            <span :class="{'paraphrase': true, 'hidden': scope.row.hidden}" @click="handleParaphrase(scope.$index, scope.row)">{{ scope.row.paraphrase }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="编辑">
          <template slot-scope="scope">
            <div v-show="!tableType">
              <el-button v-if="menuIndex === '1'" type="success" @click="cut(scope.$index, scope.row)">斩</el-button>
              <el-button v-else type="primary" @click="cut(scope.$index, scope.row)">加入复习</el-button>
              <el-button type="primary" @click="details(scope.row)">详</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <div class="pagination-left">
        <span
          class="pagination-title el-pagination"
        >共 {{ result.totalElements }} 条记录 第 {{ result.page }} /
          {{ result.totalPages }} 页
        </span>
        <el-select
          v-model="qo.size"
          class="page-size"
          placeholder="显示条数"
          @change="handleSizeChange"
        >
          <el-option
            v-for="(item, index) in [10, 20, 50, 100]"
            :key="'size'+index"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="pagination-right">
        <el-pagination
          :page-size="qo.size"
          layout="prev, pager, next"
          :pager-count="5"
          :total="result.totalElements"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { page as cutPage, del as cutDel } from '@/api/cut.js'
import { page as reviewPage, del as reviewDel } from '@/api/review.js'
import { throttle } from '@/utils/index.js'
import { Message } from 'element-ui'

export default {
  name: 'Review',
  data() {
    return {
      tableType: false,
      menuIndex: '1',
      qo: {
        condition: {
          search: '',
          grade: '全部'
        },
        size: 100,
        page: 1
      },
      result: {}
    }
  },
  mounted() {
    this.reviewRequests = throttle(this.reviewRequests)
    this.cutRequests = throttle(this.cutRequests)
    this.cut = throttle(this.cut, 200)
    this.reviewRequests()
  },
  methods: {
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
    },
    details(row) {
      this.$router.push({ name: 'word', params: { w: row.wordId }})
    },
    reviewStart() {
      this.tableType = true
      this.reviewRequests()
    },
    cutStart() {
      this.tableType = true
      this.cutRequests()
    },
    reviewRequests() {
      this.tableType = true
      reviewPage(this.qo).then(res => {
        res.content = res.content.map(m => {
          return { ...m, hidden: true }
        })
        this.result = res
        this.tableType = false
      })
    },
    cutRequests() {
      this.tableType = true
      cutPage(this.qo).then(res => {
        res.content = res.content.map(m => {
          return { ...m, hidden: true }
        })
        this.result = res
        this.tableType = false
      })
    },
    handleSizeChange(value) {
      this.qo.size = value
      this.qo.page = 1
      if (this.menuIndex === '1') {
        this.reviewStart()
      } else {
        this.cutStart()
      }
    },
    handleCurrentChange(value) {
      this.qo.page = value
      if (this.menuIndex === '1') {
        this.reviewStart()
      } else {
        this.cutStart()
      }
    },
    handleSelect(key) {
      this.menuIndex = '' + key
      this.qo.page = 1
    },
    cut(index, row) {
      if (this.menuIndex === '1') {
        reviewDel(row.id).then(res => {
          Message({
            type: 'success',
            message: '斩'
          })
          this.result.content.splice(index, 1)
        })
      } else {
        cutDel(row.id).then(res => {
          Message({
            type: 'success',
            message: '加入复习成功'
          })
          this.result.content.splice(index, 1)
        })
      }
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-left {
    .active {
      background: #000;
    }
  }
</style>
