<template>
  <div id="app" class="homeBox">
    <div class="login_tit">
      <h1>快速登录</h1>
      <h2>欢迎使用银元宝</h2>
    </div>
    <div class="login_box">
      <div class="login_body">
        <div class="login1">
          <input
            placeholder="请输入11位手机号码"
            type="number"
            name="mobilePhone"
            v-model="mobilePhone"
            focus="true"
            maxlength="16"
          />
          <!--1. maxlength="11" -->
          <!--:oninput="onChangeClick()" focus="true"-->
        </div>
      </div>
      <div class="zhuce_box">
        <a>未注册的手机号验证后自动创建银元宝账号</a>
        <p></p>
      </div>
      <button class="button" @click="goNextClick">下一步</button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
/*eslint-disable*/
import Toast from '../../static/vant/toast/toast'

export default {
  data() {
    return {
      mobilePhone: '',
      phoneApi: '',
      userInfo: {}
    }
  },
  components: {},
  watch: {
    // 'mobilePhone': {
    //   handler (newValue, oldValue) {
    //     this.mobilePhone = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.mobilePhone.trim()
    //   },
    //   deep: true
    // }
  },
  methods: {
    onChangeClick() {
      // if (this.mobilePhone.length < 13) {
      //   if (this.mobilePhone.length > 3 && this.mobilePhone.length < 7) {
      //     this.mobilePhone = this.mobilePhone.replace(/\s/g, ' ').replace(/[^\d]/g, ' ').replace(/(\d{3})(?=\d)/g, '$1 ')
      //   } else if (this.mobilePhone.length >= 7) {
      //     this.mobilePhone = this.mobilePhone.replace(/\s/g, ' ').replace(/[^\d]/g, ' ').replace(/(\d{4})(?=\d)/g, '$1 ')
      //   }
      // }
    },

    goNextClick() {
      this.phoneApi = this.mobilePhone
        .replace(/\s*/g, '')
        .replace(/[\r\n]/g, '')
        .trim()
      // this.phoneApi = this.phoneApi.replace(' ', '').replace(' ', '').replace('\\s*', '')
      if (this.phoneApi.length !== 11) {
        Toast('请输入有效的手机号')
        // return
      }

      let phoneStr = this.phoneApi
      let result = phoneStr.startsWith('admin')
      if (result) {
        this.phoneApi = phoneStr.slice(5) //admin15261489949
        const path = '/pages/loginPwd'
        const query = {
          mobilePhone: this.phoneApi
        }
        this.$router.push({ path, query, reLaunch: false })
      } else {
        this.$iBox
          .http(
            'Api.registerLoginApi', //通过此接口注册或登录
            {
              phone: this.phoneApi
            },
            true
          )({})
          .then(res => {
            console.log(res)

            if (res.data.status === '0') {
              // 0:未注册 【未注册直接发送注册短信】
              this.$iBox
                .http(
                  'Api.sendCodeApi', // 发送验证码
                  {
                    phone: this.phoneApi,
                    type: 'register' //注册
                  },
                  true
                )({})
                .then(() => {
                  const path = '/pages/loginCode'
                  const query = {
                    isRegister: 'yes',
                    mobilePhone: this.phoneApi
                  }
                  this.$router.push({ path, query, reLaunch: false })
                })
            } else {
              // 1:已注册
              this.$iBox
                .http(
                  'Api.sendCodeApi',
                  {
                    phone: this.mobilePhone,
                    type: 'login'
                  },
                  true
                )({})
                .then(() => {
                  const path = '/pages/loginCode'
                  const query = {
                    isRegister: 'no',
                    mobilePhone: this.mobilePhone
                  }
                  this.$router.replace({ path, query })
                })
            }
            //   const path = '/pages/loginPwd'
            //   const query = {
            //     mobilePhone: this.phoneApi
            //   }
            //   this.$router.push({ path, query, reLaunch: false })
          })
      }
    }
  },
  created() {},
  mounted() {},
  onUnload() {
    this.mobilePhone = ''
    this.phoneApi = ''
  },
  onLoad() {}
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
