<template>
  <div class="channelCategory">
    <div class="list-wrapper">
      <div class="item" @click="goCheckClick(item.id)" v-for="(item,index) in dataJson" :key="index">{{item.name}}<span>({{item.describe}})</span></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      setDesc: true,
      dataJson: [{'name': '自渠', 'id': '2', 'describe': '描述1'}, {'name': '分销', 'id': '3', 'describe': '描述2'}, {'name': '全民经纪人', 'id': '1', 'describe': '描述3'}],
      status: ''
    }
  },
  methods: {
    goCheckClick (id) {
      const path = '/pages/userCheck'
      const query = {
        'status': this.status,
        'id': id
      }
      this.$router.push({ path, query, reLaunch: false })
    }
  },
  onShow () {
    this.status = this.$root.$mp.query.status
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .channelCategory
    .list-wrapper
      .item
        padding 10px
        background #ffffff
        border-bottom 1px solid #ddd
        span 
          color #999
          font-size 12px
          padding-left 10px
</style>