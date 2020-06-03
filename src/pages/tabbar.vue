<template>
  <div id="app">
    <van-tabbar
      v-model="active4"
      active-color="#1F293F"
      inactive-color="#A5A7A9"
    >
      <van-tabbar-item @click="tab(0)">
        首页
        <image
          slot="icon"
          src="/static/tabs/tabbar1.png"
          mode="aspectFit"
        />
        <image
          slot="icon-active"
          src="/static/tabs/tabbar01.png"
          mode="aspectFit"
        />
      </van-tabbar-item>
      <van-tabbar-item>
        客户
        <image
          slot="icon"
          src="/static/tabs/tabbar2.png"
          mode="aspectFit"
        />
        <image
          slot="icon-active"
          src="/static/tabs/tabbar02.png"
          mode="aspectFit"
        />
      </van-tabbar-item>
      <van-tabbar-item>
        报备
        <image
          slot="icon"
          src="/static/tabs/tabbar3.png"
          mode="aspectFit"
        />
        <image
          slot="icon-active"
          src="/static/tabs/tabbar03.png"
          mode="aspectFit"
        />
      </van-tabbar-item>
      <van-tabbar-item info="2">
        消息
        <image
          slot="icon"
          src="/static/tabs/tabbar4.png"
          mode="aspectFit"
        />
        <image
          slot="icon-active"
          src="/static/tabs/tabbar04.png"
          mode="aspectFit"
        />
      </van-tabbar-item>
      <van-tabbar-item>
        我的
        <image
          slot="icon"
          src="/static/tabs/tabbar5.png"
          mode="aspectFit"
        />
        <image
          slot="icon-active"
          src="/static/tabs/tabbar05.png"
          mode="aspectFit"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        active4: 0
      }
    },
    components: {
    },
    methods: {
      tab (idx) {
        const path = '/pages/index'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: true })
      }
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      wx.hideTabBar()
    }
  }
</script>

<style scoped>
</style>
