<template>
  <div id="app">
    <!--头部-->
    <div class="ban_sea_box">
      <!--个人信息登录前-->
      <div class="ct_box_qian" v-show="isLogin === false">
        <h1>Hi~欢迎使用银元宝</h1>
        <h2>登录后获得更多精彩内容</h2>
        <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">去登录</button>
      </div>
      <!--个人信息登录后-->
      <div class="ct_box" v-show="isLogin === true">
        <div class="ct_name" @click="goModifyUserClick">
          <div class="ct_left"><img :src="avatarUrl" @error="errorfn"/></div>
          <div class="ct_right">
            <p>{{nickName}}</p>
            <b>{{phone}}</b>
            <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"/>
          </div>
        </div>
        <div class="ct_mendian">
          <div class="ct_list"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/gs_icon.png"/>
            <p>{{companyName}}-{{storeName}}</p>
          </div>
          <!--<div class="ct_list"> <img src="/static/images/md_icon.png"/>-->
            <!--<p>{{storeName}}</p>-->
          <!--</div>-->
        </div>
        <!--提示填写门店-->
        <div class="qipao_body" v-show="storeShow">
          <div class="bubble">
            <p @click="goCheckClick">{{setDesc}}</p>
            <!--<img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/close@3x.png" @click="goCloseSetClick"/>-->
          </div>
        </div>
      </div>
    </div>
    <!--功能模块-->
    <div class="yewu_box">
      <!-- <div class="mingxi_tit" v-show="roleType">
        <h1>团队管理</h1>
      </div> -->
      <ul v-show="roleType">
        <li @click="goGroupListClick" style="border:none"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_01.png"/>
          <p>我的团队</p>
        </li>
        <li @click="goGroupCheckClick"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_02.png"/>
          <p>员工审核</p>
        </li>
        <li @click="goCustomerStatisticsClick"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_03.png"/>
          <p>客户统计</p>
        </li>
      </ul>
      <!-- <div class="mingxi_tit">
        <h1>个人中心</h1>
      </div> -->
      <ul>
        <!--<li @click="goModifyPhoneClick"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_04.png"/>-->
          <!--<p>变更手机号</p>-->
        <!--</li>-->
        <li @click="goModifyStoreClick" v-show="status === '2'" style="border:none">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_05.png"/>
          <p>变更渠道分管中心</p>
        </li>
        <li @click="goSetClick"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_07.png"/>
          <p>设置</p>
        </li>
      </ul>
      <div class="title" v-show="allAgent && isLogin === true">神眼云是银城集团官方合作实名结佣平台</div>
      <div class="content" v-if="allAgent && isLogin === true" @click="Authentication">
        <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/me_07.png"/>
        神眼云 
        <span v-if="accountNumber === '' || accountNumber === 'null' || accountNumber === null">(前往神眼云认证)</span>
        <span v-else>({{accountNumber}})</span>
        <div class="realname" v-show="isAuth">已认证</div>
        <div class="realname" v-show="!isAuth">未认证</div>
      </div>
    </div>
    <van-toast id="van-toast" />
    <!-- <view style="width:100%;position:relative;height:400rpx;background:gray;">
      <official-account style=""></official-account>
    </view> -->
  </div>
</template>

<script>
  import Toast from '../../static/vant/toast/toast'
  export default {
    data () {
      return {
        isLogin: false,
        userInfo: {},
        nickName: '',
        phone: '',
        avatarUrl: '',
        companyName: '渠道信息',
        storeName: '渠道分管中心',
        setDesc: '您还未设置所属渠道，是否现在去设置？',
        status: '',
        storeShow: false,
        roleType: false,
        isShow: false,
        accountNumber: '',
        allAgent: '',
        isAuth: ''
      }
    },
    components: {
    },
    methods: {
      SetNameTitle (index) {
        console.log(index)
        if (index !== '') {
          return '已认证'
        } else {
          return '未认证'
        }
      },
      errorfn () {
        this.avatarUrl = 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/tx.png'
      },
      goCloseSetClick () {
        this.storeShow = false
      },
      bindGetUserInfo (e) {
        if (e.mp.detail.userInfo) {
          const self = this
          wx.login({
            success (res) {
              if (res.code) {
                self.userInfo.nickName = e.mp.detail.userInfo.nickName
                self.userInfo.avatarUrl = e.mp.detail.userInfo.avatarUrl
                self.$store.userInfo = self.userInfo
                self.goLoginClick()
              }
            }
          })
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
          Toast('银元宝需要获取你的公开信息')
        }
      },
      goLoginClick () {
        const path = '/pages/login'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goCustomerStatisticsClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        const path = '/pages/customerStatistics'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goGroupListClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        const path = '/pages/groupList'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goGroupCheckClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        const path = '/pages/groupCheck'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goModifyPhoneClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        const path = '/pages/modifyPhone'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goModifyStoreClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        const path = '/pages/modifyStore'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goModifyUserClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        const path = '/pages/modifyUser'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goCheckClick () {
        if (!this.isLogin) {
          const path = '/pages/login'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: false })
          return
        }
        let path = '/pages/userCheck'
        const query = {
          'status': this.status
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goSetClick () {
        const path = '/pages/setting'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      Authentication () {
        console.log('pages/register/register?authUserId=' + this.userInfo.userId + '&mobile=' + this.userInfo.phone + '&comId=c6bf68cff9a363f1f6d819848d4ed76v')
        wx.navigateToMiniProgram({
          appId: 'wx5d826cbcfe9dc948',
          path: 'pages/register/register?authUserId=' + this.userInfo.userId + '&mobile=' + this.userInfo.phone + '&comId=c6bf68cff9a363f1f6d819848d4ed76v',
          envVersion: 'release'
        })
      },
      initLoginSuccess () {
        this.nickName = this.$store.userInfo.nickName
        this.phone = this.$store.userInfo.phone
        this.avatarUrl = this.$store.userInfo.avatarUrl
        this.isShow = this.$store.userInfo.isShow
        this.accountNumber = this.$store.userInfo.accountNumber
        this.allAgent = this.$store.userInfo.allAgent
        this.isAuth = this.$store.userInfo.isAuth
        if (this.$store.userInfo.roleType !== undefined && this.$store.userInfo.roleType === 'manager') {
          this.roleType = true
        } else {
          this.roleType = false
        }
        // 0:注册-未绑定 1:绑定门店申请中(绑定待审核) 2:绑定成功(在职)
        this.status = this.$store.userInfo.status
        if (this.status === '0') {
          this.storeShow = true
          this.companyName = '渠道信息'
          this.storeName = '渠道分管中心'
          this.setDesc = '您还未设置所属渠道，是否现在去设置？'
        } else if (this.status === '1') {
          this.companyName = this.$store.userInfo.companyName
          this.storeName = this.$store.userInfo.storeName
          this.storeShow = true
          this.setDesc = '您绑定的所属渠道申请正在审核中，是否现在去查看？'
        } else if (this.status === '2') {
          this.companyName = this.$store.userInfo.companyName
          this.storeName = this.$store.userInfo.storeName
          this.storeShow = false
        } else {
          this.storeShow = false
        }
      }
    },
    created () {
    },
    onLoad () {
    },
    onUnload () {
    },
    onShow () {
      console.log('13245456')
      if (this.$store.isLogin) {
        this.isLogin = true

        this.$iBox.http('Api.getUserInfoApi')({}).then(respUserInfo => {
          this.userInfo.nickName = respUserInfo.data.nickName
          this.userInfo.avatarUrl = respUserInfo.data.headImg
          this.userInfo.phone = respUserInfo.data.phone
          this.userInfo.realName = respUserInfo.data.realName
          this.userInfo.idCard = respUserInfo.data.idCard
          this.userInfo.roleType = respUserInfo.data.roleType
          this.userInfo.companyName = respUserInfo.data.companyName
          this.userInfo.storeName = respUserInfo.data.storeName
          this.userInfo.companyId = respUserInfo.data.companyId
          this.userInfo.storeId = respUserInfo.data.storeId
          // 1:注册-未绑定 2:绑定门店申请中(绑定待审核) 3:绑定成功(在职) 4:离职
          this.userInfo.status = respUserInfo.data.status
          this.userInfo.userId = respUserInfo.data.userId
          this.userInfo.allAgent = respUserInfo.data.allAgent
          this.userInfo.isAuth = respUserInfo.data.isAuth
          if (respUserInfo.data.allAgent) {
            // this.isShow = true
            this.userInfo.isShow = true
            if (respUserInfo.data.authAccount === null) {
              // this.accountNumber = ''
              this.userInfo.accountNumber = ''
            } else {
              // this.accountNumber = respUserInfo.data.authAccount
              this.userInfo.accountNumber = respUserInfo.data.authAccount
            }
          }
          this.$store.userInfo = this.userInfo
          this.initLoginSuccess()
        })
      } else {
        this.isLogin = false
        this.roleType = false
        this.companyName = '渠道信息'
        this.storeName = '渠道分管中心'
        this.status = ''
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

  .ban_sea_box{ background:url(http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/banner_bg.png) no-repeat 100% 100%; background-size:7.5rem 3rem;width: 7.5rem;height: 3rem; border: 0.01rem solid #2D5AD6;border-bottom: 0.01rem solid #fff; box-sizing: border-box;background-color: #2D5AD6}
  /*登录前*/
  .ct_box_qian{ width:7.1rem; height:2.8rem; margin:0 auto; border-radius:0.18rem; margin-top:0.9rem; background:#fff;box-shadow:0rem 0.1rem 0.26rem 0rem rgba(0,0,0,0.09);position: relative;}
  .ct_box_qian h1{ font-size:0.4rem; color:#3A4042; font-weight:500; text-align:center; margin-top:0.3rem;padding-top:0.3rem; display:block;}
  .ct_box_qian h2{ font-size:0.24rem; color:#9C9EA0; font-weight:400; text-align:center; margin-top:0.1rem;display:block;}
  .ct_box_qian button{ font-size:0.3rem; color:#3A4042;  text-align:center; width:2rem; height:0.8rem; display:block; line-height:0.8rem; margin:0 auto; border:0.01rem solid #979797; border-radius:0.12rem; margin-top:0.3rem;}

  /*登录后*/
  .ct_box{ width:7.1rem; height:2.8rem; margin:0 auto; border-radius:0.18rem; margin-top:0.9rem; background:#fff;box-shadow:0rem 0.1rem 0.26rem 0rem rgba(0,0,0,0.09);position: relative;border: 0.01rem solid #f900;}
  .ct_name{ width:7.1rem; height:1.66rem;}
  .ct_left{ float:left; width:1.7rem; height:1.66rem;}
  .ct_left img{ width:1.2rem; height:1.2rem; margin-left:0.2rem; margin-top:0.3rem;border-radius: 100rem;}

  .ct_right{ float:left; width:5rem; height:1.66rem; border-bottom:0.01rem solid #E5E5E5; position:relative;}
  .ct_right img{ width:0.35rem; height:0.35rem; position:absolute; right:0rem;top:0.7rem;}
  .ct_right p{font-size:0.32rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(19,29,53,1); display:block; margin-top:0.34rem;}
  .ct_right b{font-size:0.3rem;font-family:PingFangSC-Regular;font-weight:300;color:rgba(148,152,164,1); display:block;margin-top:0.2rem;}
  .ct_mendian{width:5rem; height:1.1rem; margin-left: 1.7rem;}
  .ct_list{ height:1.1rem; float:left;}
  .ct_list img{ float:left; width:0.28rem;height: 0.28rem; margin-top:0.41rem;}
  .ct_list p{ float:left; font-size:0.26rem;font-family:PingFangSC-Regular;font-weight:400;color:#131D35; line-height:1.1rem; margin-left:0.1rem;width: 4.6rem;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}

  /*气泡填写*/
  .qipao_body{ padding:0rem 0.15rem; height:0.9rem;position: absolute;left: 0.7rem;bottom: -0.8rem;}
  .bubble{  padding:0rem 0.15rem;height:0.8rem; position:relative; background:rgba(0, 0, 0, 0.5); border-radius:0.15rem}
  .bubble:after{content:'';position:absolute;bottom:100%;left:0.9rem;width:0;height:0;border-width:0.09rem;border-style:solid;border-color:transparent;margin-bottom:0rem;border-bottom-width:0.14rem;border-bottom-color:currentColor;color:rgba(0, 0, 0, 0.5);}
  .bubble p{font-size:0.23rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(255,255,255,1); line-height:0.8rem; margin-left:0.1rem; float:left; display:block;}
  .bubble p span{ color:#ff9800; margin-left:0.1rem;}
  .bubble img{ float:right; width:0.2rem; height:0.2rem; display: block; margin-top:0.3rem; margin-right:0.1rem;}

  /*功能模块*/

  .yewu_box{width:7.1rem;padding-bottom: 0.6rem; margin-left:0.2rem;border-radius:0.12rem; z-index:999;margin-top:0.8rem;overflow: hidden;}

  .yewu_box .mingxi_tit{ width:7.1rem; margin:0 auto; height:0.8rem; line-height:0.8rem;margin-top:0.3rem;background-color: #ffffff}
  .yewu_box .mingxi_tit h1{ font-size:0.32rem; margin-left:0.2rem;}
  .yewu_box ul { margin:0 auto;background-color: #ffffff;padding: 0 0.2rem;margin-top: 0.2rem;border-radius: 5px}
  .yewu_box ul li{color:#15a8ff;display: flex;border-top: 1px solid #ddd;height: 1rem;line-height: 1rem}
  .yewu_box ul li img{ width:0.4rem; height:0.4rem;margin-right: 0.2rem;margin-top: 0.28rem;}
  .yewu_box ul li p{ font-size:0.28rem;display:block; color:#3A4042;}
  .title { color: #999;padding: 0.2rem 0; font-size: 0.24rem}
  .content {background: #fff;padding: 0.2rem; border-radius: 5px;font-size:0.28rem;color: #3A4042;display: flex;position: relative;}
  .content img{ width:0.4rem; height:0.4rem;margin-right: 0.2rem;}
  .realname {position: absolute;right: 0.2rem;}
</style>
