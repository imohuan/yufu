<template>
  <div class="container">
    <div class="search">
      <div class="search-right">
        <el-input
          v-model="qo.condition.search"
          placeholder="请输入单词,名称"
        />
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        v-loading="tableType"
        :data="result.content"
        style="width: 100%"
      >
        <el-table-column align="center" prop="code" label="商品编码" />
        <el-table-column align="center" prop="name" label="商品名称" />
        <el-table-column align="center" prop="price" label="商品价格" />
        <el-table-column align="center" prop="entryDt" label="添加时间" />
        <el-table-column align="center" prop="updateDt" label="更新时间" />
      </el-table>
    </div>
    <div class="pagination">
      <div class="pagination-left">
        <span
          class="pagination-title el-pagination"
        >共 {{ result.totalElements }} 条记录 第 {{ result.page }} /
          {{ result.totalPages }} 页
        </span>
      </div>
      <div class="pagination-right">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="qo.size"
          layout="prev, pager, next, sizes, jumper"
          :total="result.totalElements"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { page } from '@/api/word.js'
export default {
  name: 'Manage',
  data() {
    return {
      tableType: false,
      qo: {
        condition: {
          search: ''
        },
        size: 10,
        page: 1
      },
      result: {}
    }
  },
  mounted() {
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
    requests() {
      this.tableType = true
      // page(this.qo).then(res => {
      //   this.result = res
      //   this.tableType = false
      // })
    },
    onSearch() {
      this.qo.page = 1
      this.requests()
    },
    handleSizeChange(value) {
      this.qo.size = value
      this.requests()
    },
    handleCurrentChange(value) {
      this.qo.page = value
      this.requests()
    }
  }
}
</script>

<style scoped></style>
