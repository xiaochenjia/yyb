<template>
  <div id="app">
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    components: {
    },
    methods: {
      goInitClick () {
        // wx.showLoading({
        //   title: '跳转中',
        //   mask: true
        // })
        // const path = '/pages/report'
        // const query = {
        // }
        // this.$router.push({ path, query, reLaunch: false })
        wx.navigateTo({
          url: 'report'
        })
      },
      goIndexClick () {
        // wx.showLoading({
        //   title: '跳转中',
        //   mask: true
        // })
        // const path = '/pages/index'
        // const query = {
        // }
        // this.$router.push({ path, query, reLaunch: true })
        wx.switchTab({
          url: 'index'
        })
      }
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      if (this.$store.transition === true) {
        this.$store.transition = false
        this.goIndexClick()
      } else {
        this.goInitClick()
      }
    }
  }
</script>

<style scoped>
</style>
