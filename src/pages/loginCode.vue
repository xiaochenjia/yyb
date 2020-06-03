<template>
  <div id="app" class="homeBox">
    <div class="login_tit">
      <h1>输入短信验证码</h1>
      <h2>验证码已发送至{{mobilePhone}}{{mobilePhoneDesc}}</h2>
    </div>
    <view class="code-box">
      <view class="flex-box">
        <input type="number" focus="true" maxlength="4" class="hide-input" @input="getVal" />

        <block v-for="(item, index) in ranges" :key="index">
          <view
            :class="['item', { active: codeIndex === item, middle: type === 'middle', bottom: type === 'bottom', box: type === 'box' }]"
          >
            <view class="line" v-if="type !== 'middle'"></view>
            <view v-if="type === 'middle' && codeIndex <= item" class="iconfont icon-line"></view>
            <block v-if="isPwd && codeArr.length >= item">
              <text class="dot">.</text>
            </block>
            <block v-else>{{ codeArr[index] ? codeArr[index] : ''}}</block>
          </view>
        </block>
      </view>

      <div class="zhuce_box">
        <a @click="goResetClick">{{sendTip}}</a>
      </div>
    </view>
    <!--<div class="login_box">-->
    <!--<div class="login_body">-->
    <!--<input style="width: 0px;height: 0px;" type="number" maxlength="4" :oninput="onChangeClick()" v-model="vcode" :focus="isShowKey ? true : false">-->
    <!--<div class="login1">-->
    <!--<p @click="goShowKeyClick">{{one}}</p>-->
    <!--</div>-->
    <!--<div class="login1">-->
    <!--<p @click="goShowKeyClick">{{two}}</p>-->
    <!--</div>-->
    <!--<div class="login1">-->
    <!--<p @click="goShowKeyClick">{{three}}</p>-->
    <!--</div>-->
    <!--<div class="login1">-->
    <!--<p @click="goShowKeyClick">{{four}}</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="zhuce_box">-->
    <!--<a @click="goResetClick">{{sendTip}}</a>-->
    <!--&lt;!&ndash;<p @click="goPwdClick" v-show="isRegister === 'no'">密码登录</p>&ndash;&gt;-->
    <!--</div>-->
    <!--&lt;!&ndash;<a class="button" @click="goLoginClick">登录</a> &ndash;&gt;-->
    <!--</div>-->
    <van-toast id="van-toast" />
  </div>
</template>

<script>
/*eslint-disable*/
import Toast from '../../static/vant/toast/toast'
export default {
  data() {
    return {
      sendTip: '',
      mobilePhone: '',
      isRegister: 'no',
      userInfo: {},
      vcode: '',
      one: '',
      two: '',
      three: '',
      four: '',
      isShowKey: true,
      isStop: false,
      counter: {},
      mobilePhoneDesc: '',
      isRequest: false,
      codeIndex: 1,
      codeArr: [],
      ranges: [1, 2, 3, 4],
      type: 'middle',
      isPwd: false
    }
  },
  components: {},
  mounted() {
    Toast('验证码已发送')
    this.initCode()
  },
  methods: {
    getVal(e) {
      let { value } = e.mp.detail //2348
      let arr = value.split('') //["2", "3", "4", "8"]
      this.codeIndex = arr.length + 1 //5
      this.codeArr = arr //["2", "3", "4", "8"]
      // console.log('this.codeArr.join(\'\')' + this.codeArr.join(''))
      if (this.codeIndex > 4) {
        // this.$emit('finish', this.codeArr.join(''))
        this.vcode = this.codeArr.join('') //'2348'
        this.goLoginClick()
      }
    },
    goShowKeyClick() {
      this.isShowKey = true
    },
    onChangeClick() {
      if (this.isStop && !this.isRequest) {
        return
      }
      if (this.vcode.length === 0) {
        this.one = ''
        this.two = ''
        this.three = ''
        this.four = ''
        this.isRequest = false
      } else if (this.vcode.length === 1) {
        this.one = this.vcode
        this.two = ''
        this.three = ''
        this.four = ''
        this.isRequest = false
      } else if (this.vcode.length === 2) {
        this.two = this.vcode.substr(1, 1)
        this.three = ''
        this.four = ''
        this.isRequest = false
      } else if (this.vcode.length === 3) {
        this.three = this.vcode.substr(2, 1)
        this.four = ''
        this.isRequest = false
      } else if (this.vcode.length === 4) {
        this.four = this.vcode.substr(3, 1)

        if (this.one === '') {
          this.one = this.vcode.substr(0, 1)
        }

        if (this.two === '') {
          this.two = this.vcode.substr(1, 1)
        }

        if (this.three === '') {
          this.three = this.vcode.substr(2, 1)
        }

        if (!this.isRequest) {
          this.isStop = true
          setTimeout(() => {
            this.goLoginClick()
          }, 500)
        }
      }
    },
    //s后重新获取验证码
    initCode() {
      let times = 59
      this.sendTip = times + 's后重新获取验证码'
      this.counter = setInterval(() => {
        if (times > 0) {
          times--
          this.sendTip = times + 's后重新获取验证码'
        } else {
          this.sendTip = '重新获取'
          clearInterval(this.counter)
        }
      }, 1000)
    },
    goPwdClick() {
      const path = '/pages/loginPwd'
      const query = {}
      this.$router.replace({ path, query })
    },
    goResetClick() {
      if (this.sendTip === '重新获取') {
        let codeType
        if (this.isRegister === 'yes') {
          codeType = 'register'
        } else {
          codeType = 'login'
        }
        // 发送验证码
        this.$iBox
          .http(
            'Api.sendCodeApi',
            {
              phone: this.mobilePhone,
              type: codeType
            },
            true
          )({})
          .then(() => {
            this.initCode()
          })
      }
    },
    goLoginClick() {
      // this.isShowKey = false
      if (this.isRegister === 'no') {
        const self = this
        wx.login({
          success(res) {
            console.log('code', res)

            if (res.code) {
              self.code = res.code
              // 获取用户注册状态  通过此接口获取小程序的session和openid信息
              self.$iBox
                .http(
                  'Api.wxCode2SessionApi', //用户登录凭证[小程序所得]
                  {
                    code: self.code
                  },
                  true
                )({})
                .then(res => {
                  self.$store.token = res.data.token
                  self.$iBox //通过此接口验证码登录
                    .http(
                      'Api.loginByVCodeApi',
                      {
                        phone: self.mobilePhone,
                        vCode: self.vcode,
                        type: 'login',
                        openId: res.data.openId
                      },
                      true
                    )({})
                    .then(() => {
                      self.$store.userInfo.phone = self.mobilePhone
                      self.$store.isLogin = true
                      self.$router.go(2)
                    })
                    .catch(e => {
                      console.log('login:' + e)
                      self.isShowKey = true
                      self.isStop = false
                      self.isRequest = true
                    })
                })
                .catch(e => {
                  console.log(e)
                })
            }
          }
        })
      } else {
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
                      'Api.registerByFinishApi', //通过此接口注册密码验证
                      {
                        phone: self.mobilePhone,
                        vCode: self.vcode,
                        type: 'register',
                        openId: res.data.openId,
                        nickName: self.$store.userInfo.nickName,
                        headimgUrl: self.$store.userInfo.avatarUrl
                      },
                      true
                    )({})
                    .then(() => {
                      self.$iBox
                        .http('Api.getUserInfoApi')({})
                        .then(respUserInfo => {
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
                      console.log('register:' + e)
                      self.isShowKey = true
                      self.isStop = false
                      self.isRequest = true
                    })
                })
                .catch(e => {
                  console.log(e)
                })
            }
          }
        })
      }
    }
  },
  created() {},
  onLoad() {},
  onUnload() {
    this.vcode = ''
    this.one = ''
    this.two = ''
    this.three = ''
    this.four = ''
    this.mobilePhoneDesc = ''
    this.isShowKey = true
    this.isStop = false
    this.isRequest = false
    this.codeIndex = 1
    this.codeArr = []
    clearInterval(this.counter)
  },
  onShow() {
    this.mobilePhone = this.$root.$mp.query.mobilePhone
    this.isRegister = this.$root.$mp.query.isRegister

    if (this.isRegister === 'yes') {
      this.mobilePhoneDesc = '，默认密码为手机号码后6位。'
    } else {
      this.mobilePhoneDesc = '，请在下方输入框内输入4位验证码。'
    }
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
  width: 1.52rem;
  margin: 0 auto;
  height: 1.3rem;
  line-height: 1.3rem;
  border-bottom: 0.02rem solid #797979;
  float: left;
  margin-left: 0.2rem;
}

.login1 p {
  float: left;
  width: 100%;
  display: block;
  line-height: 0.4rem;
  font-size: 0.52rem;
  border: none;
  outline: none;
  background: none;
  font-weight: 400;
  color: #333;
  margin-top: 0.7rem;
  text-align: center;
  height: 0.4rem;
  display: block;
}
input::-webkit-input-placeholder {
  color: #d2d2d2;
}

.zhuce_box {
  width: 6.7rem;
  margin: 0 auto;
  height: 0.3rem;
  line-height: 0.3rem;
}
.zhuce_box a {
  font-size: 0.28rem;
  font-weight: 400;
  color: #9498a4;
  margin-top: 0.3rem;
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

@keyframes tw {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
.code-box {
  text-align: center;
  margin-top: 0.6rem;
}
.flex-box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
.flex-box .hide-input {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  text-align: left;
  z-index: 9;
  opacity: 1;
}
.flex-box .item {
  position: relative;
  width: 1rem;
  height: 1rem;
  margin-right: 0.18rem;
  font-size: 0.7rem;
  font-weight: bold;
  color: #333;
  line-height: 1rem;
}
.flex-box .item:last-child {
  margin-right: 0;
}
.flex-box .middle {
  border: 0.02rem solid #cccccc;
}
.flex-box .box {
  box-sizing: border-box;
  border: 0.02rem solid #cccccc;
  border-radius: 0.06rem;
}
.flex-box .bottom {
  box-sizing: border-box;
  border-bottom: 0.08rem solid #212121;
}
.flex-box .active {
  border-color: #00c777;
}
.flex-box .active .line {
  display: block;
}
.flex-box .line {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.02rem;
  height: 0.04rem;
  background: #333333;
  animation: tw 1s infinite ease;
}
.flex-box .dot {
  font-size: 0.8rem;
  line-height: 0.4rem;
}
</style>
