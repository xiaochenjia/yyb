<template>
  <div id="app">
    <!--头部标题-->
    <div class="team_tit">
      <h1>待审核员工</h1>
    </div>
    <!--门店-->
    <div class="mendian_body">
      <div class="mendian_list" v-for="(store, index) in storeList" :key="index">
        <div class="mendian_tit">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/md_icon@3x.png"/>
          <h1>{{store.storeName}}<span>({{store.storeNum}})</span></h1>
        </div>
        <div class="personnel_box"><!--控制personnel_box此区域显示隐藏实现收缩效果-->
          <ul>
            <li @click="goCheckClick(member, store)" v-for="(member, indexs) in store.memerList" :key="indexs">
              <div class="per_left"><img :src="member.memberImg"/></div>
              <div class="per_mid"><p>{{member.memberName}}</p><a @click="goTelClick(member.memberTel)">{{member.memberTel}}</a></div>
              <div class="per_right"><b :class="member.status === '0' ? 'daiqueren' : member.status === '1' ? 'zaizhi' : 'lizhi' ">{{member.statusValue}}</b></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--未登录-->
    <div v-show="noData" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png"/>
      <p>暂无数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        storeList: [],
        noData: false
      }
    },
    components: {
    },
    methods: {
      goTelClick (tel) {
        wx.makePhoneCall({
          phoneNumber: tel
        })
      },
      goCheckClick (member, store) {
        let path
        if (member.status === '0') {
          path = '/pages/groupCheckResult'
        } else if (member.status === '1') {
          path = '/pages/groupCheckResult'
        } else {
          return
        }
        const query = {
          'memberId': member.memberId,
          'memberTel': member.memberTel,
          'storeId': store.storeId,
          'storeName': store.storeName,
          'memberName': member.memberName,
          'memberImg': member.memberImg,
          'companyId': member.companyId,
          'status': member.status,
          'statusValue': member.statusValue
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      initData () {
        this.$iBox.http('Api.groupMemberCheckListApi')({}).then((res) => {
          this.storeList = res.data.list
          if (this.storeList.length > 0) {
            this.noData = false
          } else {
            this.noData = true
          }
        })
      }
    },
    created () {
    },
    mounted () {
    },
    onUnload () {
      this.storeList = []
      this.noData = false
    },
    onLoad () {
    },
    onShow () {
      this.initData()
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
  .team_tit{ width:7.5rem; height:1.4rem; background:#2D5AD6; border:0.01rem solid #2D5AD6;box-sizing: border-box;}
  .team_tit h1{ font-size:0.45rem; color:#fff; margin-left:0.2rem; margin-top:0.1rem;}

  /*头部标题*/
  .mendian_body{ width:7.5rem; margin-top:-0.4rem;}
  .mendian_list{ width:7.1rem; margin:0 auto; border-radius:0.12rem; background:#fff;margin-bottom: 0.3rem;box-shadow: 0 0.02rem 0.3rem 0 rgba(154, 181, 255, 0.18);}
  .mendian_tit{ height:0.88rem; width:7.1rem;}
  .mendian_tit img{ float:left; width:0.34rem; height:0.34rem; display:block; margin-left:0.2rem; margin-top:0.27rem;}
  .mendian_tit h1{ float:left;display:block; font-size:0.3rem; color:#3A4042; font-weight:500; line-height:0.88rem;margin-left:0.1rem;}
  .mendian_tit a{ float:right;  display:block;font-size:0.24rem; color:#3A4042; font-weight:500;line-height:0.88rem; margin-right:0.2rem;}
  .mendian_tit .off{ color:#A3A3A3;}
  .mendian_tit .on{ color:#393939;}
  .personnel_box ul li{ width:7.1rem; height:1.6rem; border-top:0.01rem solid #E5E5E5;}
  .personnel_box ul li .per_left{ float:left; width:1.2rem; height:1.2rem; margin-left:0.15rem; margin-top:0.15rem;}
  .personnel_box ul li .per_left img{ width:1.2rem; height:1.2rem;border-radius: 100rem;}

  .personnel_box ul li .per_mid{ float:left;}
  .personnel_box ul li .per_mid p{ font-size:0.3rem; color:#3A4042; font-weight:500; display:block; margin-left:0.2rem; margin-top:0.2rem;}
  .personnel_box ul li .per_mid a{ font-size:0.3rem; color:#999DA8; font-weight:400; display:block;margin-left:0.2rem; margin-top:0.2rem;}

  .personnel_box ul li .per_right{ float:right;}
  .personnel_box ul li .per_right b{ width:1.1rem; height:0.5rem; background:#f90; color:#fff; line-height:0.5rem; font-size:0.24rem; display:block; text-align:center; margin-top:0.55rem; margin-right:0.15rem; border-radius:100rem;font-weight:400;}
  .personnel_box ul li .per_right .daiqueren{ background:#6B92F7;}
  .personnel_box ul li .per_right .zaizhi{ background:#16AD78;}
  .personnel_box ul li .per_right .lizhi{ background:#D1D1D1;}

</style>
