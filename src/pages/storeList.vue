<template>
  <div id="app">
    <!--单行选择-->
    <div class="danhang_xuanze" v-for="(item, index) in storeList" :key="index" @click="goStoreClick(item)">
      <p>{{item.storeName}}</p>
      <img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-right@3x.png"/>
    </div>
    <!--无数据-->
    <div v-show="isNull" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png"/>
      <p>暂无渠道分管中心数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        storeList: [],
        companyId: '',
        isNull: false,
        type: ''
      }
    },
    components: {
    },
    methods: {
      goStoreClick (item) {
        if (this.type === 'set') {
          this.$store.storeId = item.storeId
          this.$store.storeName = item.storeName
        } else if (this.type === 'modify') {
          this.$store.storeIdModify = item.storeId
          this.$store.storeNameModify = item.storeName
        }
        this.$router.back()
      }
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      this.type = this.$root.$mp.query.type
      if (this.$root.$mp.query.companyId !== undefined) {
        this.companyId = this.$root.$mp.query.companyId
        this.$iBox.http('Api.homeStoreListApi', {
          'companyId': this.companyId
        })({}).then(res => {
          this.storeList = res.data.list
          if (this.storeList.length > 0) {
            this.isNull = false
          } else {
            this.isNull = true
          }
        })
      }
    }
  }
</script>

<style scoped>
  :after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  .danhang_xuanze{ width:7.5rem; background:#fff; border-bottom:0.01rem solid #E5E5E5; height:1rem;}
  .danhang_xuanze p{ float:left; font-size:0.3rem; font-weight:bold;color:#3A4042; margin-left:0.2rem; line-height:1rem;}
  .danhang_xuanze .arr_right{  width:0.15rem; height: 0.26rem;float: right; margin-top: 0.05rem; margin-right:0.2rem; margin-top:0.37rem;}

</style>
