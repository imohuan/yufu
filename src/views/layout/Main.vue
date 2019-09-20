<template>
  <div class="entry">
    <div class="containers">
      <div class="header clearfix">
        <div class="left-logo" @click="toggleItem">
          <svg-icon class="svg" icon-class="menu" />
        </div>
        <div class="right-title">
          <h2 class="none-select">语符</h2>
        </div>
      </div>
      <div class="nr">
        <transition name="fadeInLeft" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
          <div v-show="opened" class="menu">
            <vmenu
              v-for="(route, index) in routes"
              v-show="!route.meta.hidden"
              :key="index"
              :class="{ 'active': mainRoute === route.path }"
              :title="route.meta.title"
              :icon="route.meta.icon"
              :to="route.path"
            />
          </div>
        </transition>
        <div :class="{main: 'true', hidden: !opened }" @click="closeBar">
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ResizeHandler from '@/utils/ResizeHandler.js'
import { childrenRoutes } from '@/router.js'

export default {
  name: 'Main',
  components: {
    vmenu
  },
  mixins: [ResizeHandler],
  data() {
    return {
      routes: []
    }
  },
  computed: {
    ...mapGetters(['mainRoute', 'opened', 'device'])
  },
  mounted() {
    const routeList = childrenRoutes
    this.routes = routeList.filter(f => {
      if (f.meta) {
        return true
      }
    })
  },
  methods: {
    ...mapMutations(['SET_MAIN_ROUTE', 'TOGGLE_SIDEBAR']),
    ...mapActions(['closeSideBar']),
    toggleItem() {
      this.TOGGLE_SIDEBAR()
    },
    closeBar() {
      if (this.device === 'mobile') {
        this.closeSideBar(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-title {
    h2 {
      font-weight: bold;
      letter-spacing: 2rem;
    }
  }
</style>
