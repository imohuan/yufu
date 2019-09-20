<template>
  <div class="card-panel" @click="handleSetLineChartData('review')">
    <div class="card-panel-icon-wrapper icon-review">
      <svg-icon class="svg-size" :icon-class="content.icon" />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">
        {{ content.name }}
      </div>
      <count-to v-show="content.data >= 0" :start-val="0" :end-val="content.data" :duration="2600" class="card-panel-num" />
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handlePanelGroupClick', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    /*&:hover {*/
      /*box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);*/
    /*}*/

    .svg-size {
      width: 4rem;
      height: 4rem;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 7px 0 0 7px;
      padding: 1rem;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width: 45%;
      box-sizing: border-box;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 0;
      width: 50%;
      box-sizing: border-box;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-icon-wrapper {
    width: 50%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
    }
  }
}
</style>
