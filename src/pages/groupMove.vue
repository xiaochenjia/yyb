<template>
  <div id="app">
    <!--单行选择-->
    <div class="danhang_xuanze">
      <h1>客户所属员工姓名：</h1>
      <p>{{member.memberName}}</p>
    </div>
    <div class="danhang_xuanze" @click="goMemberClick">
      <h1>客户转移员工姓名：</h1>
      <img
        class="arr_right"
        src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-right@3x.png"
      />
      <p>{{moveName}}</p>
    </div>
    <!--固定底部按钮-->
    <div style="height: 1rem;"></div>
    <div class="ding_bot_btn">
      <a @click="goSubmitClick">提交</a>
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
      member: {},
      moveName: '请选择员工',
      moveId: ''
    }
  },
  components: {},
  methods: {
    goSubmitClick() {
      if (this.moveId.length === 0) {
        Toast('请选择员工')
        return
      }
      // 0:未通过 1：通过
      this.$iBox
        .http(
          'Api.groupMemberTransferHandleApi',
          {
            transferMemberId: this.member.memberId,
            receiveMemberId: this.moveId
          },
          true
        )({})
        .then(() => {
          Toast('处理成功')
          this.$store.groupListRefresh = true
          setTimeout(() => {
            this.$router.go(3)
          }, 1000)
        })
    },
    goMemberClick() {
      const path = '/pages/groupMember'
      const query = {
        memberId: this.member.memberId
      }
      this.$router.push({ path, query, reLaunch: false })
    }
  },
  created() {},
  onLoad() {},
  onUnload() {
    this.member = {}
    this.moveName = '请选择员工'
    this.moveId = ''
  },
  onShow() {
    this.member.memberId = this.$root.$mp.query.memberId
    this.member.memberTel = this.$root.$mp.query.memberTel
    this.member.storeId = this.$root.$mp.query.storeId
    this.member.storeName = this.$root.$mp.query.storeName
    this.member.memberName =
      this.$root.$mp.query.memberName + '(' + this.member.memberTel + ')'

    if (this.$store.groupHandleInfo !== undefined) {
      this.moveName =
        this.$store.groupHandleInfo.memberName +
        '(' +
        this.$store.groupHandleInfo.memberTel +
        ')'
      this.moveId = this.$store.groupHandleInfo.memberId
      this.$store.groupHandleInfo = undefined
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
.danhang_xuanze {
  width: 7.5rem;
  background: #fff;
  border-bottom: 0.01rem solid #e5e5e5;
  height: 1rem;
}
.danhang_xuanze h1 {
  float: left;
  font-size: 0.3rem;
  font-weight: bold;
  color: #9498a4;
  margin-left: 0.2rem;
  line-height: 1rem;
}
.danhang_xuanze p {
  float: right;
  font-size: 0.3rem;
  font-weight: bold;
  color: #3a4042;
  margin-right: 0.2rem;
  line-height: 1rem;
}
.danhang_xuanze .arr_right {
  width: 0.12rem;
  height: 0.24rem;
  float: right;
  margin-right: 0.2rem;
  position: relative;
  top: 0.38rem;
}

/*筛选*/
.shaixuan_box {
  width: 7.5rem;
  padding: 0.2rem 0rem;
  line-height: 1rem;
  border-bottom: 0.01rem solid #e5e5e5;
  background: #fff;
}
.shaixuan_box ul {
  float: left;
  width: 6.5rem;
  height: 0.9rem;
}
.shaixuan_box ul li {
  float: left;
  width: 1.6rem;
  height: 0.6rem;
  text-align: center;
  display: block;
  margin-top: 0.19rem;
  margin-left: 0.2rem;
  font-size: 0.26rem;
  background: #ededed;
  color: #bfbfbf;
  line-height: 0.6rem;
}
/*固定底部按钮*/
.ding_bot_btn {
  width: 7.5rem;
  height: 1rem;
  position: fixed;
  bottom: 0rem;
  left: 0rem;
}
.ding_bot_btn a {
  width: 7.5rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #fff;
  background: #2d5ad6;
  text-align: center;
  display: block;
}
</style>
