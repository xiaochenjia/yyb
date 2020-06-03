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
        messageId: '',
        content: '',
        messageName: ''
      }
    },
    components: {
      wxParse
    },
    methods: {
      initData () {
        this.$iBox.http('Api.messageDetailApi', {
          'messageId': this.messageId
        })({}).then((res) => {
          this.content = res.data
        })
      }
    },
    created () {
    },
    mounted () {
      this.initData()
    },
    onUnload () {
      this.content = ''
    },
    onLoad () {
    },
    onShow () {
      this.messageId = this.$root.$mp.query.messageId
      this.messageName = this.$root.$mp.query.messageName ? this.$root.$mp.query.messageName : '消息详情'
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
