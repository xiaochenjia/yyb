<template>
  <div id="app">
    <!--头部标题-->
    <div class="team_tit">
      <h1>团队员工</h1>
      <div class="searchbox">
        <div class="searchleft">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/sousuo_icon.png" />
          <input placeholder="输入姓名或手机号" v-model="value" name="value" />
        </div>
        <div class="searchright" @click="SearchClick">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/ss_icon.png" />
          <p>搜索</p>
        </div>
        <div class="clr"></div>
      </div>
    </div>
    <!--门店-->
    <div class="mendian_body">
      <div class="mendian_list" v-for="(store, index) in storeList" :key="index">
        <div class="personnel_box">
          <!--控制personnel_box此区域显示隐藏实现收缩效果-->
          <ul>
            <li
              @click="goCheckClick(member, store)"
              v-for="(member, indexs) in memberList"
              :key="indexs"
            >
              <div class="per_left">
                <img :src="member.memberImg" />
              </div>
              <div class="per_mid">
                <p>{{ member.memberName }}</p>
                <a @click.stop="goTelClick(member.memberTel)">
                  {{
                  member.memberTel
                  }}
                </a>
              </div>
              <div class="per_right">
                <b
                  :class="
                    member.status === '0'
                      ? 'daiqueren'
                      : member.status === '1'
                      ? 'zaizhi'
                      : 'lizhi'
                  "
                >{{ member.statusValue }}</b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="!more" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png" />
      <p>暂无数据</p>
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
      idx: 0,
      more: true,
      currPageNo: 0,
      pageSize: 10,
      memberList: [],
      storeList: [],
      value: ''
    }
  },
  components: {},
  methods: {
    // 搜所查询栏
    SearchClick() {
      // console.log('搜索')
      this.$iBox
        .http('Api.groupMemberList2Api', {
          //获取指定团队成员列表
          type: 'search',
          value: this.value,
          currPageNo: 1,
          pageSize: 10,
          storeId: this.storeList[this.idx].storeId
        })({})
        .then(res => {
          console.log(res)
          this.memberList = res.data.list
        })
    },
    goTelClick(tel) {
      wx.makePhoneCall({
        phoneNumber: tel
      })
    },

    goCheckClick(member, store) {
      if (member.status !== '1') {
        Toast('请选择在职员工')
        return
      }
      if (this.memberId === member.memberId) {
        Toast('不能选择自己')
        return
      }
      let groupHandleInfo = {}
      groupHandleInfo.memberId = member.memberId
      groupHandleInfo.memberTel = member.memberTel
      groupHandleInfo.storeId = store.storeId
      groupHandleInfo.memberName = member.memberName
      this.$store.groupHandleInfo = groupHandleInfo
      this.$router.back()
    },
    //请求员工列表
    initData() {
      this.$iBox
        .http('Api.groupListApi')({})
        .then(res => {
          // console.log(res) //通过此接口获取我的团队
          this.storeList = res.data.list

          if (this.storeList.length > 0) {
            let currPageNo = this.currPageNo
            currPageNo++
            // console.log(currPageNo)

            this.$iBox
              .http('Api.groupMemberList2Api', {
                //获取我的团队成员列表
                currPageNo,
                pageSize: 10,
                storeId: this.storeList[this.idx].storeId
              })({})
              .then(res => {
                console.log(res)
                this.currPageNo = currPageNo
                this.memberList = [...this.memberList, ...res.data.list]
                this.more =
                  this.currPageNo < Math.ceil(res.data.list[0].total / 10)
              })
          }
        })
    }
  },
  // 加载事件
  onReachBottom() {
    if (!this.more) {
      return
    }
    this.initData()
  },

  created() {},
  mounted() {
    this.initData()
  },
  onUnload() {
    this.idx = 0
    this.storeList = []
  },
  onLoad() {},
  onShow() {
    if (
      this.$store.groupListRefresh !== undefined &&
      this.$store.groupListRefresh === true
    ) {
      this.initData()
      this.$store.groupListRefresh = false
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

/*头部标题*/
.team_tit {
  width: 7.5rem;
  height: 1.4rem;
  background: #2d5ad6;
  border: 0.01rem solid #2d5ad6;
  box-sizing: border-box;
  position: relative;
}
.team_tit h1 {
  font-size: 0.4rem;
  color: #fff;
  margin-left: 0.2rem;
  margin-top: 0.45rem;
  background: #2d5ad6;
}

/* 搜索 */
.searchbox {
  width: 5rem;
  height: 0.6rem;
  background: #f8f8f8;
  margin: 0 auto;
  border-radius: 0.18rem;
  margin-top: 0.45rem;
  position: absolute;
  top: 0;
  left: 2.3rem;
}
.searchleft {
  width: 2rem;
  height: 0.6rem;
  /* background-color: yellow; */
  border-radius: 100rem;
  position: relative;
}
.searchleft img {
  width: 0.3rem;
  height: 0.3rem;
  display: block;
  float: left;
  line-height: 0.3rem;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
}
.searchleft input {
  position: absolute;
  left: 0.53rem;
  top: -0.15rem;
  width: 2.8rem;
  display: block;
  float: left;
  outline: none;
  height: 0.6rem;
  line-height: 0.6rem;
  border: none;
  background: none;
  margin-left: 0.16rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  border-right: 0.01rem solid #cecece;
}
.searchright {
  width: 1.8rem;
  float: right;
  /* background-color: red; */
  position: absolute;
  top: 0;
  right: 0;
}
.searchright img {
  width: 0.42rem;
  height: 0.42rem;
  line-height: 0.42rem;
  display: block;
  float: left;
  margin-top: 0.2rem;
  margin-left: 0.32rem;
  position: relative;
  top: -0.07rem;
}
.searchright p {
  display: block;
  float: left;
  font-size: 0.3rem;
  color: #131d35;
  font-weight: bold;
  line-height: 0.42rem;
  margin-left: 0.28rem;
  margin-top: 0.12rem;
}

/*头部标题*/
.mendian_body {
  width: 7.5rem;
  margin-top: 0.14rem;
  position: relative;
  top: -0.1rem;
}
/* .mendian_list {
  width: 7.1rem;
  margin: 0 auto;
  background: #fff;
  margin-bottom: 0.3rem;
  box-shadow: 0 0.02rem 0.3rem 0 rgba(154, 181, 255, 0.18);
} */

.personnel_box ul li {
  width: 7.1rem;
  height: 1.6rem;
  border-top: 0.01rem solid #e5e5e5;
}
.personnel_box ul li .per_left {
  float: left;
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.15rem;
  margin-top: 0.15rem;
}
.personnel_box ul li .per_left img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100rem;
}

.personnel_box ul li .per_mid {
  float: left;
}
.personnel_box ul li .per_mid p {
  font-size: 0.3rem;
  color: #3a4042;
  font-weight: 500;
  display: block;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
}
.personnel_box ul li .per_mid a {
  font-size: 0.3rem;
  color: #999da8;
  font-weight: 400;
  display: block;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
}

.personnel_box ul li .per_right {
  float: right;
}
.personnel_box ul li .per_right b {
  width: 1.1rem;
  height: 0.5rem;
  background: #f90;
  color: #fff;
  line-height: 0.5rem;
  font-size: 0.24rem;
  display: block;
  text-align: center;
  margin-top: 0.55rem;
  margin-right: 0.15rem;
  border-radius: 100rem;
  font-weight: 400;
}
.personnel_box ul li .per_right .daiqueren {
  background: #6b92f7;
}
.personnel_box ul li .per_right .zaizhi {
  background: #16ad78;
}
.personnel_box ul li .per_right .lizhi {
  background: #d1d1d1;
}
</style>
