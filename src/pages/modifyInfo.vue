<template>
  <div id="app">
    <div class="fangchan_x_body">
      <ul>
        <li>
          <p>{{name}}：</p>
          <input type="" name="value" v-model="value" :placeholder="nameP">
        </li>

      </ul>
    </div>
    <!--固定底部按钮-->
    <div style="height: 1rem;"></div>
    <div class="ding_bot_btn"> <a @click="onSubmitClick">保存</a> </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../static/vant/toast/toast'

  export default {
    data () {
      return {
        type: '',
        value: '',
        name: '',
        nameP: ''
      }
    },
    components: {
    },
    methods: {
      onSubmitClick () {
        if (this.type === 'realName' && this.value.length === 0) {
          Toast('请输入真实姓名')
          return
        } else if (this.type === 'idCard' && this.value.length === 0) {
          Toast('请输入身份证号')
          return
        } else if (this.type === 'nickName' && this.value.length === 0) {
          Toast('请输入昵称')
          return
        }
        this.$iBox.http('Api.mineInfoModifyApi', {
          'type': this.type,
          'value': this.value
        })({}).then(() => {
          Toast('变更成功')
          if (this.type === 'realName') {
            this.$store.userInfo.realName = this.value
          } else if (this.type === 'idCard') {
            this.$store.userInfo.idCard = this.value
          } else if (this.type === 'nickName') {
            this.$store.userInfo.nickName = this.value
          }
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
      this.type = this.$root.$mp.query.type
      this.value = this.$root.$mp.query.value
      if (this.type === 'realName') {
        this.name = '真实姓名'
        this.nameP = '请输入真实姓名'
      } else if (this.type === 'idCard') {
        this.name = '身份证号'
        this.nameP = '请输入身份证号'
      } else if (this.type === 'nickName') {
        this.name = '昵称'
        this.nameP = '请输入昵称'
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
  .fangchan_x_body{ width:7.5rem; background:#fff;}
  .fangchan_x_body ul li{  width:7.5rem; border-bottom:0.01rem solid #eee; display:block; margin:0 auto;padding: 0.35rem 0rem;}
  .fangchan_x_body ul li p{ float:left; color:#333; font-size:0.32rem;width: 2.3rem;margin-left: 0.2rem;}
  .fangchan_x_body ul li a{ float:right; color:#999; font-size:0.32rem;   width: 4.5rem;text-align: right;white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;}
  .fangchan_x_body ul li input{ float:right; color:#333; font-size:0.32rem;   width: 4.5rem;text-align: right;border: none; padding-right: 0.2rem;outline:medium;}
  .fangchan_x_body ul li .arr_right{  width:0.35rem; height:0.35rem; float: right; margin-top: 0.05rem; }

  .fangchan_x_body ul li .huxingtu{  width:2rem; height:2rem; float: right; margin-top: 0.05rem; margin-right: 0.2rem;}

  .btn{ width:7.5rem; height:1.4rem; margin-top: 0.3rem;}
  .btn a{width:4rem; margin:0 auto; margin-top:0.7rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background:#af8f84;
    border-radius: 20rem;
    color: #fff;  text-align:center; font-size:0.3rem; display:block;}

  /*固定底部按钮*/
  .ding_bot_btn{ width:7.5rem;  height:1rem; position:fixed; bottom:0rem; left:0rem;}
  .ding_bot_btn a{ width:7.5rem;  height:1rem; line-height:1rem; font-size:0.3rem; color:#fff; background:#2D5AD6; text-align: center; display:block;}

</style>
