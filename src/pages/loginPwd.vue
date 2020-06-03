<template>
  <div id="app" class="homeBox">
    <div class="login_tit">
      <h1>输入登录密码</h1>
      <h2>密码为6-16位字符</h2>
    </div>
    <div class="login_box">
      <div class="login_body">
        <div class="login1">
          <input placeholder="请输入您的登录密码" type="password" name="pwd" v-model="pwd" focus="true" />
        </div>
      </div>
      <!-- <div class="zhuce_box" @click="goVCodeClick">
        <a></a>
        <p>切换验证码登录</p>
      </div>-->
      <a class="button" @click="goLoginClick">登录</a>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
/*eslint-disable*/
import Toast from '../../static/vant/toast/toast'
import md5 from 'js-md5'

export default {
  data() {
    return {
      pwd: '',
      userInfo: {},
      mobilePhone: ''
    }
  },
  components: {},
  methods: {
    // goVCodeClick() {
    //   // 发送验证码
    //   this.$iBox
    //     .http(
    //       'Api.sendCodeApi',
    //       {
    //         phone: this.mobilePhone,
    //         type: 'login'
    //       },
    //       true
    //     )({})
    //     .then(() => {
    //       const path = '/pages/loginCode'
    //       const query = {
    //         isRegister: 'no',
    //         mobilePhone: this.mobilePhone
    //       }
    //       this.$router.replace({ path, query })
    //     })
    // },
    goLoginClick() {
      if (!this.$iBox.validator.isLenRange(this.pwd, [6, 16])) {
        Toast('密码长度为6-16位')
        return
      }

      const self = this
      wx.login({
        success(res) {
          if (res.code) {
            self.code = res.code
            // 获取用户注册状态
            self.$iBox
              .http(
                'Api.wxCode2SessionApi',
                {
                  code: self.code
                },
                true
              )({})
              .then(res => {
                self.$store.token = res.data.token
                self.$iBox
                  .http(
                    'Api.loginByPwdApi',
                    {
                      phone: self.mobilePhone,
                      pwd: md5(self.pwd),
                      openId: res.data.openId
                    },
                    true
                  )({})
                  .then(() => {
                    self.$iBox
                      .http('Api.getUserInfoApi')({})
                      .then(respUserInfo => {
                        // 通过此接口获取用户信息
                        self.userInfo.nickName = respUserInfo.data.nickName
                        self.userInfo.avatarUrl = respUserInfo.data.headImg
                        self.userInfo.phone = respUserInfo.data.phone
                        self.userInfo.realName = respUserInfo.data.realName
                        self.userInfo.idCard = respUserInfo.data.idCard
                        self.userInfo.roleType = respUserInfo.data.roleType
                        self.userInfo.companyName =
                          respUserInfo.data.companyName
                        self.userInfo.storeName = respUserInfo.data.storeName
                        self.userInfo.companyId = respUserInfo.data.companyId
                        self.userInfo.storeId = respUserInfo.data.storeId
                        // 1:注册-未绑定 2:绑定门店申请中(绑定待审核) 3:绑定成功(在职) 4:离职
                        self.userInfo.status = respUserInfo.data.status
                        self.$store.isLogin = true
                        self.$store.userInfo = self.userInfo
                        self.$router.go(2)
                      })
                  })
                  .catch(e => {
                    console.log(e)
                  })
              })
              .catch(e => {
                console.log(e)
              })
          }
        }
      })
    }
  },
  created() {},
  onUnload() {
    this.pwd = ''
  },
  onLoad() {
    this.mobilePhone = this.$root.$mp.query.mobilePhone
  }
}
</script>

<style scoped>
:after {
  content: '\0020';
  display: block;
  height: 0;
  clear: both;
}
.homeBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: #ffffff;
}
/*登录*/
.login_tit h1 {
  font-size: 0.5rem;
  color: #333;
  font-weight: 500;
  margin-top: 0.8rem;
  margin-left: 0.3rem;
}
.login_tit h2 {
  font-size: 0.26rem;
  color: #999;
  font-weight: 400;
  margin-top: 0.1rem;
  margin-left: 0.3rem;
}

.login_box {
  width: 7.5rem;
  margin-top: 1.2rem;
}
.login_box img {
  width: 3rem;
  display: block;
  margin: 0 auto;
}
.login_body {
  width: 7.1rem;
  margin: 0 auto;
  border-radius: 0.1rem;
  margin-top: 0.6rem;
}
.login1 {
  width: 6.7rem;
  margin: 0 auto;
  height: 1.3rem;
  border-bottom: 0.01rem solid #e5e5e5;
}

.login1 input {
  float: left;
  width: 5.3rem;
  display: block;
  height: 0.4rem;
  line-height: 0.4em;
  font-size: 0.34rem;
  border: none;
  outline: none;
  background: none;
  font-weight: 400;
  color: #333;
  margin-top: 0.45rem;
  display: block;
}
input::-webkit-input-placeholder {
  color: #d2d2d2;
  line-height: 0.4rem;
}

.zhuce_box {
  width: 6.7rem;
  margin: 0 auto;
  height: 0.3rem;
  line-height: 0.3rem;
}
.zhuce_box a {
  float: left;
  font-size: 0.24rem;
  font-weight: 400;
  color: #9498a4;
  margin-top: 0.2rem;
}
.zhuce_box p {
  float: right;
  font-size: 0.24rem;
  font-weight: 400;
  color: #2d5ad6;
  margin-top: 0.2rem;
}

.login_box .button {
  display: block;
  width: 4rem;
  margin: 0 auto;
  height: 0.9rem;
  margin-top: 1.2rem;
  background: #2d5ad6;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}
</style>
