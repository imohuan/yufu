<template>
  <div class="container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <panel-group :content="{ name: '词库', icon: 'bookmark', data: result.word_cont }" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <panel-group :content="{ name: '天', icon: 'calendar', data: result.day }" />
      </el-col>
    </el-row>

    <el-row :gutter="40" class="panel-group data-group">
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col percentage">
        <div class="percentage-title clearfix"><h5>复习单词</h5> <span>{{ result.review_word }} / {{ result.review_cont }}</span></div>
        <el-progress :text-inside="true" :color="colors" :stroke-width="26" :percentage="reviewPercentage || 0" />
        <div class="percentage-title clearfix"><h5>目标单词</h5> <span>{{ result.goal_word }} / {{ result.goal_cont }}</span></div>
        <el-progress :text-inside="true" :color="colors" :stroke-width="26" :percentage="cutPercentage || 0" />

        <panel-group style="margin-top: 2rem;" :content="{ name: '单词记忆', icon: 'bookmark', data: result.record }" />

        <!--<div class="bottom">
          <el-button type="success" round>学习</el-button>
        </div>-->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PanelGroup from '@/components/PanelGroup/index'
import { getInfo } from '@/api/info.js'
export default {
  name: 'Home',
  components: {
    PanelGroup
  },
  data() {
    return {
      colors: [
        { color: '#ff8282', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      result: {}
    }
  },
  computed: {
    reviewPercentage() {
      const result = this.result
      return (result.review_word / result.review_cont).toFixed(2) * 100
    },
    cutPercentage() {
      const result = this.result
      return (result.goal_word / result.goal_cont).toFixed(2) * 100
    }
  },
  mounted() {
    getInfo().then(res => {
      this.result = res
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .data-group {
    padding-left: 20px;
    padding-right: 20px;
    .percentage {
      width: 100%;
      background: #fff;
      margin-top: 2rem;
      padding-top: 20px;
      padding-bottom: 40px;
      .percentage-title {
        margin-top: 2rem;
        h5:first-child {
          margin-top: 0;
        }

        h5 {
          font-weight: bold;
          height: 2rem;
          line-height: 2rem;
          float: left;
        }
        span {
          float: right;
        }
      }
      .bottom {
        margin-top: 4rem;
        display: flex;
      }

    }
  }

</style>
