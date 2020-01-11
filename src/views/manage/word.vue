<template>
  <div class="container">
    <div class="search">
      <div class="search-left">
        <el-select
          v-model="qo.condition.grade"
          placeholder="等级"
        >
          <el-option
            v-for="(item, index) in selectList"
            :key="'size'+index"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          v-model="qo.condition.search"
          placeholder="请输入单词,名称"
          @keyup.enter.native="onSearch"
        />
        <el-button type="primary" @click="onSearch">搜索</el-button>
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
        <el-table-column align="center" prop="soundMark" width="120" label="音标">
          <template slot-scope="scope">{{ scope.row.sound_mark | analysis }}</template>
        </el-table-column>
        <el-table-column align="center" prop="paraphrase" width="120" label="解释" />
        <el-table-column align="center" prop="comprehensive" width="200" label="综合法" />
        <el-table-column align="center" prop="association" width="200" label="联想法" />
        <el-table-column align="center" prop="example" width="200" label="列举"></el-table-column>
        <el-table-column align="center" prop="translate" width="200" label="翻译" />
        <el-table-column align="center" width="60" label="等级">
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.grade }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="编辑">
          <template slot-scope="scope">
            <el-button type="primary" @click="details(scope.row)">详</el-button>
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
import { page } from '@/api/word.js'
import { throttle } from '@/utils/index.js'

export default {
  name: 'Manage',
  data() {
    return {
      tableType: false,
      fileType: false,
      fileName: '',
      fileUploadLoading: false,
      dialogTableType: false,
      dialogTableLoadingType: false,
      selectList: ['全部', '常用', '小学', '中考', '高考', '大学', '考研', '雅思'],
      qo: {
        condition: {
          search: '',
          grade: '全部'
        },
        search: {},
        size: 10,
        page: 1
      },
      result: {},
      parseList: null
    }
  },
  mounted() {
    this.requests = throttle(this.requests)
    this.requests()
  },
  beforeRouteEnter(to, form, next) {
    if (to.params.reset) {
      next(vm => {
        vm.requests()
      })
    }
    next()
  },
  methods: {
    details(row) {
      this.$router.push({ name: 'word', params: { w: row.id }})
    },
    requests: function() {
      this.tableType = true
      if (this.qo.condition.grade === '全部') {
        this.qo.condition.grade = null
      }
      const search = this.qo.condition.search
      if (this.qo.condition.grade !== null) this.qo.search.grade = this.qo.condition.grade
      if (search !== '') this.qo.search['$or'] = [{ code: { '$regex': search }}, { paraphrase: { '$regex': search }}]
      page(this.qo).then(res => {
        this.result = {
          totalElements: res.cont,
          totalPages: res.max_page,
          content: res.data
        }
        this.tableType = false
        if (this.qo.condition.grade === null) {
          this.qo.condition.grade = '全部'
        }
      })
    },
    onSearch() {
      this.qo.page = 1
      this.tableType = true
      this.requests()
    },
    handleSizeChange(value) {
      this.qo.size = value
      this.qo.page = 1
      this.tableType = true
      this.requests()
    },
    handleCurrentChange(value) {
      this.qo.page = value
      this.tableType = true
      this.requests()
    },
    parser() {
      this.dialogTableLoadingType = true
      this.dialogData.result = this.parseList(this.dialogData.page, this.dialogData.size)
      this.dialogTableLoadingType = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.add-file {
  width: 114px;
  height:28px;
  line-height: 28px;
  background: #409EFF;
  padding: 7px 15px;
  color: white;
  font-size: 12px;
  border-radius: 3px;
  display: inline;
  margin-right: .5rem;
}

.file-text {
  position: relative;
  width: 20rem;
  height:28px;
  line-height: 28px;
  padding: 0 30px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px dashed #1f2d3d;
  user-select:none;
  display: block;
  margin-top: 1rem;
  .file-close {
    position: absolute;
    right: 5px;
    top: 7px;
    color: #c0c4cc;
  }
}
</style>
