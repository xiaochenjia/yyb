<template>
  <div id="app">
    <div class="cneter_body">
      <div class="touxiang_list">
        <p>用户头像</p>
        <img class="touxiang" :src="userInfo.avatarUrl" @error="errorfn"></div>
      <ul>
        <li @click="goUserClick('nickName', userInfo.nickName)">
          <p>用户昵称：</p>
          <a>{{userInfo.nickName}}</a><img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"> </li>
        <li @click="goUserClick('realName', userInfo.realName)">
          <p>真实姓名：</p>
          <a>{{userInfo.realName}}</a><img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"> </li>
        <li @click="goUserClick('idCard', userInfo.idCard)">
          <p>身份证号：</p>
          <a>{{userInfo.idCard}}</a><img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"> </li>
        <li>
          <p>手机号码：</p>
          <a>{{userInfo.phone}}</a></li>
      </ul>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userInfo: {}
      }
    },
    components: {
    },
    methods: {
      errorfn () {
        this.avatarUrl = 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/tx.png'
      },
      goUserClick (type, value) {
        const path = '/pages/modifyInfo'
        const query = {
          'type': type,
          'value': value
        }
        this.$router.push({ path, query, reLaunch: false })
      }
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      if (this.$store.isLogin) {
        this.userInfo = this.$store.userInfo
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
  .cneter_body{ width:100%; background:#fff;}
  .touxiang_list{  height:1.79rem; width:7.1rem; margin:0 auto; border-bottom:0.01rem solid #EEEEEE; position:relative;}
  .touxiang_list p{ float:left; color:#999999; font-size:0.32rem; line-height:1.79rem;}
  .touxiang_list .arr_right{  width:0.35rem; height:0.35rem;position:absolute; right:0rem; top:0.72rem;}

  .touxiang_list .touxiang{ width:1.2rem; height:1.2rem; border-radius: 100rem; margin-top:0.3rem; float:right; margin-right:0.5rem;}
  .cneter_body ul li{  width:7.1rem; height:1rem;border-bottom:0.01rem solid #eee; line-height:1rem; display:block; margin:0 auto; position:relative;}
  .cneter_body ul li:last-child{border-bottom:none;}
  .cneter_body ul li p{ float:left; color:#999999; font-size:0.32rem; }
  .cneter_body ul li a{ float:right; color:#333; font-size:0.32rem; margin-right:0.5rem;}
  .cneter_body ul li .ewm{  width:0.5rem; height:0.5rem; float:right; margin-right:0.5rem; margin-top:0.25rem;}
  .cneter_body ul li .arr_right{  width:0.35rem; height:0.35rem;position:absolute; right:0rem; top:0.325rem;}

</style>
