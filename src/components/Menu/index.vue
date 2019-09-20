<template>
  <div class="menu_icon" @click="ReplaceRoute">
    <router-link :to="to">
      <div class="box">
        <svg-icon :icon-class="icon" />
        <span class="title">{{ title }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Vmenu',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations(['SET_MAIN_ROUTE']),
    ReplaceRoute() {
      this.SET_MAIN_ROUTE(this.to)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoraction: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.menu_icon {
  width: 100%;
  height: 4.65rem;
  line-height: 4.65rem;
  position: relative;
  margin-top: 0.2rem;
  background: #fff;
  &:hover,
  &.active {
    background: #e9e9d3;
  }
  .box {
    margin: auto;
  }
  .title {
    user-select: none;
    font-size: 1rem;
    font-weight: 800;
    color: black;
    width: 4.6rem;
    text-align: center;
    display: inline-block;
    /*text-align-last: justify;*/
  }
}
</style>
