<template>
  <div id="app" class="homeBox">
    <div class="login_box">
      <div class="login_body">
        <div class="login1">
          <p>原手机号码:</p>
          <input placeholder="请输入11位手机号码" type="tel" maxlength="11" name="mobilePhone" v-model="mobilePhone" >
        </div>
        <div class="login2">
          <p>原手机号码验证码:</p>
          <input class="yanzma" placeholder="请输入验证码" type="tel" maxlength="4" name="vcode" v-model="vcode" >
          <a>获取</a> </div>
      </div>
      <a class="button" @click="goNextClick">下一步</a>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mobilePhone: '',
        vcode: ''
      }
    },
    components: {
    },
    methods: {
      goNextClick () {
        const path = '/pages/modifyPhoneResult'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      }
    },
    created () {
    },
    onLoad () {
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
  .homeBox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #ffffff;
  }
  /*登录*/
  .login_box { width:7.5rem;margin-top: 0.2rem;}
  .login_box img{ width:3rem; display:block; margin:0 auto; }
  .login_body{ border-bottom:0.01rem solid #e6e6e6; width: 7.1rem;margin: 0 auto; border-radius:0.1rem; margin-top:0.2rem; margin-top:1rem;}
  .login1{width:7.1rem;margin: 0 auto;line-height:1.1rem; border-bottom:0.01rem solid #e6e6e6;}
  .login1 p{float: left;display:block; height:1.2rem;line-height:1.2rem; font-size:0.3rem; margin-left:0.2rem;}
  .login1 input{float: left;margin-top:0.36rem;display:block;line-height:1.2rem;font-size:0.3rem; border:none;outline: none; background:none; margin-left:0.2rem;}
  .login1 .yanzma{float: left;width:1.2rem; display:block;line-height:1.2rem;font-size:0.26rem; border:none;background: none;}
  .login1 a{ float:left; display:block; width:2.5rem; height:1.2rem; background:#1494ff;  text-align:center; line-height:1.2rem; border-radius:10rem; font-size:0.3rem; color:#fff;}

  .login2{width:7.1rem;margin: 0 auto;line-height:1.2rem; }
  .login2 p{float: left;display:block; height:1.2rem;line-height:1.2rem; font-size:0.3rem;margin-left:0.2rem;}
  .login2 input{float: left;margin-top:0.36rem; display:block;line-height:1.2rem;font-size:0.3rem; border:none; outline: none; background:none; margin-left:0.2rem;}
  .login2 .yanzma{float: left;width:2.3rem; display:block;line-height:1.2rem;font-size:0.3rem; border:none; }
  .login2 a{ float:right; display:block; width:1.5rem; height:.7rem; background:#2D5AD6;  text-align:center; line-height:0.7rem; border-radius:10rem; font-size:0.3rem; color:#fff; margin-top:0.2rem; margin-right:0.2rem;}

  .login_box .button{ display:block;width: 4rem;margin: 0 auto; height:0.9rem; margin-top:1.2rem;background:#2D5AD6; color:#fff; text-align:center; line-height:0.9rem; font-size:0.3rem; border-radius:0.1rem;}

</style>
