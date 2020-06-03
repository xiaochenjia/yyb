<template>
  <div id="app">
    <div class="fu_box">
      <wxParse :content="content" />
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'

  export default {
    data () {
      return {
        dynamicId: '',
        content: '',
        messageName: ''
      }
    },
    components: {
      wxParse
    },
    methods: {
      initData () {
        this.$iBox.http('Api.projectDynamicDetailApi', {
          'dynamicId': this.dynamicId
        })({}).then((res) => {
          this.content = res.data.content
        })
      }
    },
    created () {
    },
    mounted () {
      this.initData()
    },
    onLoad () {
    },
    onUnload () {
      this.content = ''
    },
    onShow () {
      this.dynamicId = this.$root.$mp.query.dynamicId
      this.messageName = this.$root.$mp.query.messageName ? this.$root.$mp.query.messageName : '动态详情'
      wx.setNavigationBarTitle({
        title: this.messageName
      })
    }
  }
</script>

<style scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  .fu_box{ width: 90%;margin-bottom: 0.88rem ;margin-left: 5%}
</style>
