<template>
  <div id="app">
    <div class="cneter_body">
      <ul>
        <li @click="goAboutClick">
          <p>关于我们</p>
          <img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"/>
        </li>
        <!--<li @click="goTelClick">-->
          <!--<p>联系客服</p>-->
          <!--<a>400-800-999</a>-->
          <!--<img class="arr_right" src="/static/images/arrow_r.png"/>-->
        <!--</li>-->
      </ul>
    </div>
    <div class="out_box" v-show="isLogout"> <a @click="getCloseClick">退出登录</a> </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
  import Dialog from '../../static/vant/dialog/dialog'
  export default {
    data () {
      return {
        isLogout: false
      }
    },
    components: {
    },
    methods: {
      goTelClick () {
        wx.makePhoneCall({
          phoneNumber: ''
        })
      },
      getCloseClick () {
        Dialog.confirm({
          title: '提示',
          message: '是否确定退出账号？'
        }).then(() => {
          this.$iBox.http('Api.logoutApi')({}).then(() => {
            this.$store.isLogin = false
            this.$store.token = ''
            this.$store.userInfo = {}
            // 计数器
            this.$iBox.isLogout_customer = true
            this.$iBox.isLogout_report = true
            this.$router.back()
          })
        }).catch(() => {
          // on cancel
        })
      },
      goAboutClick () {
        const path = '/pages/about'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      }
    },
    mounted () {
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      if (this.$store.isLogin) {
        this.isLogout = true
      } else {
        this.isLogout = false
      }
    }
  }
</script>

<style scoped>
  /*个人信息和设置*/
  .cneter_body{ width:100%; background:#fff;}

  .cneter_body ul li{  width:7.1rem; height:1rem;border-bottom:0.01rem solid #eee; line-height:1rem; display:block; margin:0 auto; position:relative;}
  .cneter_body ul li:last-child{border-bottom:none;}
  .cneter_body ul li p{ float:left; color:#555; font-size:0.32rem; }
  .cneter_body ul li a{ float:right; color:#333; font-size:0.32rem; margin-right:0.5rem;}
  .cneter_body ul li .ewm{  width:0.5rem; height:0.5rem; float:right; margin-right:0.5rem; margin-top:0.25rem;}
  .cneter_body ul li .arr_right{  width:0.35rem; height:0.35rem;position:absolute; right:0rem; top:0.325rem;}
  .out_box{ width:7.5rem; height:1rem; background:#fff; margin-top:1.6rem;border-bottom:0.01rem solid #EEEEEE;border-top:0.01rem solid #EEEEEE;}
  .out_box a{ text-align:center; line-height:1rem; color:#444; font-size:0.3rem; width:100%; display:block;}
</style>
