<template>
  <div id="app">
    <!--头部标题-->
    <div class="team_tit"> <img :src="member.memberImg"/>
      <h1>{{member.memberName}}</h1>
      <a>{{member.memberTel}}</a> </div>
    <!--员工信息-->
    <div class="yg_info_box">
      <div class="yg_info_tit"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/shenfen_icon.png"/>
        <h1>员工信息</h1>
      </div>
      <div class="yg_info_txt">
        <ul>
          <li><b>所属渠道分管中心</b>
            <p>{{member.storeName}}</p>
          </li>
          <li><b>当前状态</b>
            <p>{{member.statusValue}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!--底部按钮-->
    <div style="height:1.5rem;"></div>
    <div class="btn"><a style=" background:#66C18F;" @click="goLeaveClick">员工离职</a><a style="background:#4270ED" @click="goMoveClick">客户转移</a></div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        member: {}
      }
    },
    components: {
    },
    methods: {
      goLeaveClick () {
        const path = '/pages/groupLeave'
        const query = {
          'memberId': this.member.memberId,
          'storeId': this.member.storeId,
          'storeName': this.member.storeName,
          'memberName': this.member.memberName,
          'memberTel': this.member.memberTel
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goMoveClick () {
        const path = '/pages/groupMove'
        const query = {
          'memberId': this.member.memberId,
          'storeId': this.member.storeId,
          'storeName': this.member.storeName,
          'memberName': this.member.memberName,
          'memberTel': this.member.memberTel
        }
        this.$router.push({ path, query, reLaunch: false })
      }
    },
    created () {
    },
    mounted () {
    },
    onLoad () {
    },
    onShow () {
      this.member.memberId = this.$root.$mp.query.memberId
      this.member.storeName = this.$root.$mp.query.storeName
      this.member.memberName = this.$root.$mp.query.memberName
      this.member.memberTel = this.$root.$mp.query.memberTel
      this.member.memberImg = this.$root.$mp.query.memberImg
      this.member.status = this.$root.$mp.query.status
      this.member.statusValue = this.$root.$mp.query.statusValue
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
  /*头部标题*/
  .team_tit{ width:7.5rem; height:4rem; background:#2D5AD6; border:0.01rem solid #2D5AD6;box-sizing: border-box;}
  .team_tit img{ width:1.6rem; height:1.6rem; margin:0 auto; display: block; margin-top:0.6rem;background-color: #2D5AD6;border-radius: 100rem;}
  .team_tit h1{ font-size:0.4rem; color:#fff;margin-top:0.2rem; text-align:center;}
  .team_tit a{ font-size:0.3rem; color:#fff;margin-top:0.1rem; text-align:center; display:block;}
  /*员工信息*/
  .yg_info_box{width:7.5rem;}
  .yg_info_tit{ width:7.5rem; height:1rem;}
  .yg_info_tit img{ float:left; display:block; width:0.32rem; height:0.32rem; margin-left:0.3rem; margin-top:0.34rem}
  .yg_info_tit h1{ float:left;font-size:0.32rem; color:#333;margin-left:0.1rem; line-height:1rem;}
  .yg_info_txt{width:6.9rem; margin:0 auto;}
  .yg_info_txt ul li{ margin-bottom:0.3rem;}
  .yg_info_txt ul li b{ font-size:0.24rem; color:#717171; display:block; font-weight:400; line-height:0.4rem;}
  .yg_info_txt ul li p{ font-size:0.3rem; color:#212121; display:block; font-weight:500; line-height:0.4rem;}
  /*底部按钮*/
  .btn{ width:7.5rem; height:1.4rem; background:#fff; position:fixed; bottom:0rem;left:0rem;}
  .btn a{width:3.3rem; margin:0 auto; margin-top:0.25rem; float:left;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background:#af8f84;
    border-radius:0.12rem;
    color: #fff;  text-align:center; font-size:0.3rem; display:block;margin-left: 0.3rem;}

</style>
