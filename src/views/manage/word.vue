<template>
  <div class="container">
    <div class="search">
      <div class="search-left">
        <input id="fileInput" ref="file" type="file" style="display: none" @change="fileChange">
        <label for="fileInput" class="add-file"><i class="el-icon-plus el-icon--left" />添加文件</label>
        <el-button type="success" :loading="fileUploadLoading" @click="upload"><i class="el-icon-upload el-icon--left" />解析数据</el-button>
        <transition name="fade">
          <span v-show="fileType" class="file-text">{{ fileName }}<i class="el-icon-close file-close" @click="closeText" /></span>
        </transition>
      </div>
      <div class="search-right">
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
        />
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        v-loading="tableType"
        :data="result.content"
        height="400"
        style="width: 100%"
      >
        <el-table-column align="center" width="120" label="单词">
          <template slot-scope="scope">
            <span v-translate class="code">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="soundMark" width="120" label="音标">
          <template slot-scope="scope">{{ scope.row.soundMark | analysis }}</template>
        </el-table-column>
        <el-table-column align="center" prop="paraphrase" width="120" label="解释" />
        <el-table-column align="center" prop="comprehensive" width="200" label="综合法" />
        <el-table-column align="center" prop="association" width="200" label="联想法" />
        <el-table-column align="center" prop="example" width="200" label="列举" />
        <el-table-column align="center" prop="translate" width="200" label="翻译" />
        <el-table-column align="center" label="等级">
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.grade }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="picture" label="图片" />
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

    <el-dialog class="word-dialog" :append-to-body="true" title="单词列表" :visible.sync="dialogTableType" width="90%">
      <div class="table">
        <el-table
          v-loading="dialogTableLoadingType"
          :height="400"
          :data="dialogData.result.content"
          style="width: 100%"
        >
          <el-table-column align="center" width="120" label="单词">
            <template slot-scope="scope">
              <span v-translate class="code">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="soundMark" width="120" label="音标">
            <template slot-scope="scope">{{ scope.row.soundMark | analysis }}</template>
          </el-table-column>
          <el-table-column align="center" prop="paraphrase" width="120" label="解释" />
          <el-table-column align="center" prop="comprehensive" width="200" label="综合法" />
          <el-table-column align="center" prop="association" width="200" label="联想法" />
          <el-table-column align="center" prop="example" width="200" label="列举" />
          <el-table-column align="center" prop="translate" width="200" label="翻译" />
          <el-table-column align="center" label="等级">
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.grade }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="pagination-left">
          <span
            class="pagination-title el-pagination"
          >共 {{ dialogData.result.total }} 条记录 第 {{ dialogData.page }} /
            {{ dialogData.result.totalPage }} 页
          </span>
          <el-select
            v-model="qo.size"
            class="page-size"
            placeholder="显示条数"
            @change="dialogHandleSizeChange"
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
            :page-size="dialogData.size"
            layout="prev, pager, next"
            :pager-count="5"
            :total="dialogData.result.total"
            @current-change="dialogHandleCurrentChange"
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableType = false">取 消</el-button>
        <el-button type="primary" @click="save">全部导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { save, page } from '@/api/word.js'
import { readXLSX, parseList } from '@/utils/xlsx.js'
import { throttle } from '@/utils/index.js'
import { mapGetters } from 'vuex'

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
      dialogData: {
        page: 1,
        size: 10,
        result: {
          content: [],
          total: 0,
          totalPage: 0
        }
      },
      qo: {
        condition: {
          search: '',
          grade: '全部'
        },
        size: 100,
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
    save() {
      const data = this.parseList(0, 0, true)
      save(data).then(res => {
        this.$message({
          message: `上传成功, 同步更新${res}条数据`,
          type: 'success'
        })
        this.onSearch()
        this.dialogTableType = false
      })
    },
    requests() {
      this.tableType = true
      if (this.qo.condition.grade === '全部') {
        this.qo.condition.grade = null
      }
      page(this.qo).then(res => {
        this.result = res
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
      this.closeText()
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
    dialogHandleCurrentChange(value) {
      this.dialogData.page = value
      this.parser()
    },
    dialogHandleSizeChange(value) {
      this.dialogData.size = value
      this.parser()
    },
    closeText() {
      this.$refs['file'].value = ''
      this.fileType = false
    },
    fileChange() {
      const file = this.$refs['file'].files[0]
      if (file === undefined) {
        this.closeText()
        return false
      }
      this.fileType = true
      this.fileName = file['name']
    },
    upload: function() {
      const files = this.$refs['file']
      const fileObj = files.files[0]
      const name = fileObj['name'].toLowerCase()
      if (files.length < 1) {
        this.$message({
          message: '请选择上传文件',
          type: 'warning'
        })
        return false
      } else if (!/\.(xls|xlsx)$/.test(name)) {
        this.$message({
          message: '请选择上传xls或者xlsx文件',
          type: 'warning'
        })
        return false
      }
      this.fileUploadLoading = true
      this.dialogData = { page: 1, size: 10, result: {
        content: [],
        total: 0,
        totalPage: 0
      }}
      readXLSX(files.files).then(res => {
        this.fileUploadLoading = false
        this.dialogTableType = true
        const grade = fileObj.name.slice(0, 2)
        this.parseList = parseList(res, grade)
        this.parser()
      })
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
