<template>
  <div class="entry">
    <div class="containers">
      <div class="header" />
      <div class="nr">
        <div class="menu">
          <vmenu
            v-for="(route, index) in routes"
            :key="index"
            :class="{ 'active': mainRoute === route.path }"
            :title="route.meta.title"
            :icon="route.meta.icon"
            :to="route.path"
          />
        </div>
        <div class="main">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vmenu from '@/components/Menu/'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Main',
  components: {
    vmenu
  },
  data() {
    return {
      routes: {}
    }
  },
  computed: {
    ...mapGetters(['mainRoute'])
  },
  mounted() {
    const routeList = this.$router.options.routes
    this.routes = routeList.filter(f => {
      if (f.meta) {
        return true
      }
    })
  },
  methods: {
    ...mapMutations(['SET_MAIN_ROUTE'])
  }
}
</script>

<style lang="scss" scoped>
.entry {
  position: relative;
  .containers {
    position: relative;
    margin: 40px auto;
    width: 95%;
    height: 630px;
    background: #f3f8f9;
    overflow: hidden;
    .header {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 73px;
      background: #fff;
      box-shadow: 0 4px 11px 0 #d7d8d8;
      z-index: 999;
    }
    .nr {
      position: absolute;
      top: 73px;
      left: 0;
      right: 0;
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .menu {
        float: left;
        background: #fff;
        width: 15%;
        height: 557px;
        min-width: 140px;
      }
      .main {
        float: right;
        background: #f3f8f9;
        width: 85%;
        height: 557px;
        padding: 10px;
      }
    }
  }
}
</style>
