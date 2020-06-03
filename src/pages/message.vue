<template>
  <div id="app">
    <div v-show="isPageLogin">
      <!--菜单-->
      <div class="top-head">
        <van-tabs :active="active" color="#2D5AD6" @change="onChange" line-width="50">
          <van-tab :title="item.typeName" :info="item.typeNum === 0 ? '' : item.typeNum" v-for="(item, index) in messageTypeList" :key="index"></van-tab>
        </van-tabs>
      </div>
      <div class="dingdan_body">
        <div class="dingdan_list" @click="goDetailClick(item)" v-for="(item, index) in messageList" :key="index">
          <div class="dingdan_list_tit">
            <h1>{{item.messageName}}</h1>
            <i v-if="item.isRead === 0" class="weidu"></i>
            <p>{{item.messageDate}}</p>
          </div>
          <div class="dingdan_tex">
            <p>{{item.messageDesc}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--未登录-->
    <div v-show="!isPageLogin" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/weidenglu_icon.png"/>
      <p>您当前未登录账号，无法进行操作</p>
      <p>请登录后方可进行操作</p>
      <a class="button" @click="goLoginClick">去登录</a>
    </div>
    <div v-show="isPageLogin && noData" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png"/>
      <p>暂无数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        active: 0,
        isPageLogin: false,
        messageTypeList: [],
        messageList: [],
        noData: false
      }
    },
    mounted () {
    },
    components: {
    },
    methods: {
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        console.log(scrollTop)
        // if (scrollTop > 329) {
        //   this.whether = true
        // } else {
        //   this.whether = false
        // }
      },
      goDetailClick (item) {
        if (item.messageIsDrill === 'true') {
          const path = '/pages/messageDetail'
          const query = {
            'messageId': item.messageId,
            'messageName': item.messageName
          }
          this.$router.push({ path, query, reLaunch: false })
        }
      },
      goLoginClick () {
        const path = '/pages/mine'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: true })
      },
      onChange (event) {
        let item = this.messageTypeList[event.mp.detail.index]
        this.active = event.mp.detail.index
        item.typeNum = 0
        this.initData(item)
      },
      initData (item) {
        this.messageList = []
        this.$iBox.http('Api.messageListApi', {
          'typeId': item.typeId
        })({}).then((res) => {
          this.messageList = res.data === undefined ? [] : res.data
          if (this.messageList.length > 0) {
            this.noData = false
          } else {
            this.noData = true
          }
        })
      },
      initSearch () {
        this.$iBox.http('Api.messageTypeListApi')({}).then((res) => {
          this.messageTypeList = res.data.list
          if (this.messageTypeList.length > 0) {
            this.messageTypeList[0].typeNum = 0
            this.initData(this.messageTypeList[0])
          }
        })
      },
      initMessage () {
      //   this.$iBox.http('Api.messageNoReadNumApi')({}).then((res) => {
      //     let noReadNum = res.data.num
      //     if (parseInt(noReadNum) > 0) {
      //       wx.setTabBarBadge({
      //         index: 3,
      //         text: noReadNum
      //       })
      //     } else {
      //       wx.removeTabBarBadge({
      //         index: 3
      //       })
      //     }
      //   })
      }
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      if (this.$store.isLogin) {
        this.isPageLogin = true
        if (this.messageTypeList.length === 0) {
          this.active = 0
          this.messageTypeList = []
          this.messageList = []
          this.initMessage()
          this.initSearch()
        }
      } else {
        this.isPageLogin = false
      }
    }
  }
</script>

<style scoped>
  /*tab菜单*/
  .fenlei_box{ width:7.5rem; height:0.9rem; background:#fff; display:flex;position: fixed;
    top: 0rem; z-index:99;}
  .fenlei_box a{ font-size:0.28rem; font-weight:500; line-height:0.9rem;flex: 1; text-align:center; color:#3A4042;}
  .fenlei_box .current{ font-size:0.32rem; color:#2D5AD6; border-bottom:0.03rem solid #2D5AD6;}

  /*我的订单*/
  .dingdan_body{ width:7.5rem; padding-bottom:0.3rem;padding-top: 0.8rem;}
  .dingdan_list{  width: 7.1rem;
    padding-bottom: 0.3rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 0.12rem;
    z-index: 999;
    /*box-shadow: 0px 0.2rem 1rem 0rem rgba(18, 135, 199, 0.1);*/
    margin-top: 0.2rem;}
  .dingdan_list .dingdan_list_tit{width: 7.1rem;height: 0.88rem; position:relative; line-height:0.88rem;}
  .dingdan_list .dingdan_list_tit h1{ font-size:0.3rem;font-family:PingFang-SC-Bold;font-weight:bold;color:#131D35;float:left; display:block; margin-left:0.2rem;}
  .dingdan_list .dingdan_list_tit i{ width:0.15rem; height:0.15rem; border-radius:100rem; float:left; display:block; margin-top:0.34rem; margin-left:0.1rem;}
  .dingdan_list .dingdan_list_tit .yidu{  background:#EBEBEB;}
  .dingdan_list .dingdan_list_tit .weidu{  background:#5683ff;}

  .dingdan_list .dingdan_list_tit p{font-size:0.24rem; font-weight:normal;color:rgba(148,152,164,1);float:right; display:block;margin-right:0.2rem;}
  .dingdan_tex{width: 6.7rem; margin:0 auto;}
  .dingdan_tex p{width:6.7rem;font-size:0.24rem; font-weight:normal;color:rgba(148,152,164,1);line-height:0.34rem;}
  .clear{clear:both}
  .top-head{
    position:fixed; width:100%;height:auto; overflow-y:auto;min-height: 60px;line-height: 60px;z-index: 9999999;
  }
</style>
