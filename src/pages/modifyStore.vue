<template>
  <div id="app">
    <!--单行选择-->
    <div class="danhang_xuanze" @click="goSelectClick">
      <h1>选择渠道分管中心：</h1>
      <img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-right@3x.png"/>
      <p>{{storeName}}</p>
    </div>
    <!--<div class="danhang_xuanze">-->
      <!--<h1>状态：</h1>-->
      <!--<p style="color:#2D5AD6;">待确定</p>-->
    <!--</div>-->
    <!--固定底部按钮-->
    <div style="height: 1rem;"></div>
    <div class="ding_bot_btn"> <a @click="goSubmitClick">提交</a> </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../static/vant/toast/toast'

  export default {
    data () {
      return {
        companyName: '',
        companyId: '',
        storeName: '',
        storeId: ''
      }
    },
    components: {
    },
    methods: {
      goSelectClick () {
        const path = '/pages/storeList'
        const query = {
          'companyId': this.companyId,
          'type': 'modify'
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goSubmitClick () {
        if (this.storeId.length === 0) {
          Toast('请选择需要变更的渠道分管中心')
          return
        }
        this.$iBox.http('Api.mineStoreModifyApi', {
          'storeId': this.storeId
        })({}).then(() => {
          Toast('变更成功')
          this.$store.userInfo.storeId = this.storeId
          this.$store.userInfo.storeName = this.storeName
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        })
      }
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      this.companyName = this.$store.userInfo.companyName
      this.companyId = this.$store.userInfo.companyId
      this.storeName = this.$store.userInfo.storeName

      if (this.$store.storeIdModify !== undefined) {
        this.storeName = this.$store.storeNameModify
        this.storeId = this.$store.storeIdModify
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
  .danhang_xuanze h1{ float:left; font-size:0.3rem; font-weight:bold;color:#9498A4; margin-left:0.2rem; line-height:1rem;}
  .danhang_xuanze p{ float:right; font-size:0.3rem; font-weight:bold;color:#3A4042; margin-right:0.2rem; line-height:1rem;}
  .danhang_xuanze .arr_right{  width:0.12rem; height:0.24rem; float: right; margin-right:0.2rem;position:relative;top:0.38rem;}

  /*筛选*/
  .shaixuan_box { width:7.5rem; padding:0.2rem 0rem;line-height: 1rem;border-bottom: 0.01rem solid #E5E5E5; background:#fff; }
  .shaixuan_box ul{ float:left; width:6.5rem;height:0.9rem;}
  .shaixuan_box ul li{ float:left; width:1.6rem; height:0.6rem;text-align:center; display:block;  margin-top:0.19rem; margin-left:0.2rem;
    font-size:0.26rem; background:#EDEDED; color:#BFBFBF;line-height: 0.6rem;}
  /*固定底部按钮*/
  .ding_bot_btn{ width:7.5rem;  height:1rem; position:fixed; bottom:0rem; left:0rem;}
  .ding_bot_btn a{ width:7.5rem;  height:1rem; line-height:1rem; font-size:0.3rem; color:#fff; background:#2D5AD6; text-align: center; display:block;}

</style>
