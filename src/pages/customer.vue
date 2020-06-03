<template>
  <div id="app">
    <div v-show="isShow">
      <div v-show="isPageLogin && !noAuth">
        <!--单行选择-->
        <div class="danhang_xuanze" @click="goProjectListClick">
          <h1>选择项目：</h1>
          <img
            :class="isSelected ? 'arr_right_close' : 'arr_right'"
            @click.stop="goClearProject()"
            :src="isSelected ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/close_project.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-right@3x.png'"
          />
          <p>{{projectDetail.productId !== undefined ? projectDetail.productName : '请选择项目'}}</p>
        </div>
        <!--搜索-->
        <div class="search_kh">
          <div class="search_box">
            <div class="search_left" @click="goSearchClick">
              <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/sousuo_icon.png" />
              <p>输入客户姓名或手机号</p>
            </div>
            <div class="search_right" @click="goStatisticsClick">
              <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/tj_icon@3x.png" />
              <p>统计</p>
            </div>
            <div class="clr"></div>
          </div>
        </div>
        <!--筛选行-->
        <div class="shaixuan_box">
          <ul>
            <li
              v-for="(item, index) in statusList"
              :key="index"
              :class="item.isSelected ? 'current' : ''"
              @click="selectStatusClick(item)"
            >
              <a>{{item.statusName}}</a>
            </li>
            <li @click="delcustomerList">
              <a>去重</a>
            </li>
          </ul>
          <!-- 筛选 -->
          <img
            class="shaixuan_right"
            src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/qh_Icon.png"
            @click="selectSortClick"
            :src="sortTitleSelected ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/qh_cutterIcon.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/qh_Icon.png'"
          />
        </div>
        <!--客户-->
        <div class="kehu_body">
          <div
            class="kehu_list"
            v-for="(item, index) in customerList"
            :key="index"
            @click="goDetailClick(item)"
          >
            <div class="kh_hang01">
              <h1>{{item.customerName}}{{item.customerRealName === undefined ? '' : item.customerRealName.length === 0 ? '' : '（' + item.customerRealName + '）'}}</h1>
              <b :class="item.statusValue == '待到访' ? 'baobei' : 'chengjiao'">{{item.statusValue}}</b>
            </div>
            <div class="kh_hang02">
              <i class="fangchan_name">{{item.projectName}}</i>
              <div class="kh_hang05">
                <img
                  class="arr_down"
                  src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/phone_icon.png"
                />
                <p @click.stop="goTelClick(item.customerTel)">{{item.customerTel}}</p>
              </div>
            </div>
            <div class="kh_hang03">
              <p>推荐日期：{{item.reportedTime}}</p>
            </div>
            <div class="kh_hang03">
              <p>预约日期：{{item.orderHouseDate}}</p>
              <p>失效日期：{{item.invalidDate}}</p>
            </div>
            <div class="kh_hang04">
              <p
                v-if="item.isShowRemark && item.isShowRemarkDiplay"
                class="one"
                @click.stop="goRemarkClick(item)"
              >{{item.remark}}</p>
              <p v-else @click.stop="goRemarkClick(item)">{{item.remark}}</p>
              <img
                v-if="item.isShowRemark"
                class="arr_down"
                :src="item.isShowRemarkDiplay ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-up@3x.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-down@3x.png'"
                @click.stop="goRemarkClick(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <van-popup :show="show" @close="show = false" position="top" duration="500">
        <!--弹窗-->
        <div class="tanchuang_body" style="min-height:4.5rem;">
          <div class="tanchuang02_box">
            <ul>
              <li v-for="(item, index) in sortList" :key="index" @click="goSelectSortClick(item)">
                <p :class="item.isSelected ? 'cutter' : ''">{{item.sortName}}</p>
              </li>
            </ul>
          </div>
        </div>
      </van-popup>
    </div>
    <div v-show="!isPageLogin" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/weidenglu_icon.png" />
      <p>您当前未登录账号，无法进行操作</p>
      <p>请登录后方可进行操作</p>
      <a class="button" @click="goLoginClick">去登录</a>
    </div>
    <!--未登录-->
    <div v-show="isPageLogin && noData" class="font_box">
      <p>暂无客户数据</p>
    </div>
    <div v-show="isPageLogin && noAuth" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/weidenglu_icon.png" />
      <p>{{noAuthDesc}}</p>
      <a class="button" @click="goAuthClick" v-show="noAutoButton">去设置</a>
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
      isPageLogin: false,
      projectDetail: {},
      customerList: [],
      statusList: [],
      sortList: [],
      sortListSearch: '',
      statusListSearch: [],
      sortTitleSelected: false,
      show: false,
      status: '',
      noData: false,
      noAuth: true,
      noAuthDesc: '您还未设置所属渠道，是否现在去设置',
      noAutoButton: false,
      isShow: false,
      isSelected: false,
      currPageNo: 0,
      pageSize: 10,
      points: []
    }
  },
  components: {},
  methods: {
    // 去重
    delcustomerList() {
      this.customerList = this.points
    },
    goTelClick(customerTel) {
      wx.makePhoneCall({
        phoneNumber: customerTel
      })
    },
    selectSortClick() {
      this.show = true
    },
    goRemarkClick(item) {
      item.isShowRemarkDiplay = !item.isShowRemarkDiplay
    },
    goProjectListClick() {
      const path = '/pages/projectListAuth'
      const query = {}
      this.$router.push({ path, query, reLaunch: false })
    },
    goSearchClick() {
      const path = '/pages/customerSearch'
      const query = {}
      this.$router.push({ path, query, reLaunch: false })
    },
    goDetailClick(item) {
      console.log(item.customerId)

      const path = '/pages/customerDetail'
      const query = {
        customerId: item.customerId
      }
      this.$router.push({ path, query, reLaunch: false })
    },
    goStatisticsClick() {
      const path = '/pages/customerStatistics'
      const query = {}
      this.$router.push({ path, query, reLaunch: false })
    },
    // 筛选行状态
    selectStatusClick(item) {
      if (item.statusCode === '-1' && item.isSelected === false) {
        for (let i = 0; i < this.statusList.length; i++) {
          this.statusList[i].isSelected = false
        }
        item.isSelected = true
      } else if (item.statusCode !== '-1') {
        let num = 0
        for (let i = 0; i < this.statusList.length; i++) {
          if (this.statusList[i].statusCode === '-1') {
            this.statusList[i].isSelected = false
          } else {
            if (
              this.statusList[i].isSelected &&
              this.statusList[i].statusCode !== item.statusCode
            ) {
              num = num + 1
            }
          }
        }
        if (num > 0) {
          item.isSelected = !item.isSelected
        } else {
          if (!item.isSelected) {
            item.isSelected = !item.isSelected
          }
        }
      }

      this.statusListSearch = []
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i].isSelected === true) {
          this.statusListSearch.push(this.statusList[i].statusCode)
        }
      }
      this.currPageNo = 0
      this.customerList = []
      this.initData()
    },
    goSelectSortClick(item) {
      for (let i = 0; i < this.sortList.length; i++) {
        if (this.sortList[i].sortCode !== item.sortCode) {
          this.sortList[i].isSelected = false
        }
      }
      this.sortListSearch = ''
      item.isSelected = !item.isSelected
      if (!item.isSelected) {
        this.sortTitleSelected = false
      } else {
        this.sortTitleSelected = true

        this.sortListSearch = item.sortCode
      }
      this.show = false
      this.currPageNo = 0
      this.customerList = []
      this.initData()
    },
    goLoginClick() {
      const path = '/pages/mine'
      const query = {}
      this.$router.push({ path, query, reLaunch: true })
    },
    initSearchData() {
      this.$iBox
        .http('Api.customerConditionListApi')({})
        .then(res => {
          for (let i = 0; i < res.data.statusList.length; i++) {
            if (res.data.statusList[i].statusCode === '-1') {
              res.data.statusList[i].isSelected = true
            } else {
              res.data.statusList[i].isSelected = false
            }
          }
          this.statusList = res.data.statusList
          for (let i = 0; i < res.data.sortList.length; i++) {
            res.data.sortList.isSelected = false
          }
          this.sortList = res.data.sortList
          this.isShow = true
        })
    },
    initData() {
      // 根据条件
      let value = {}
      if (this.statusListSearch.length > 0) {
        this.$set(value, 'statusList', this.statusListSearch)
      }

      if (this.sortListSearch.length > 0) {
        this.$set(value, 'sortList', this.sortListSearch)
      }

      let projectListSearch = []
      if (
        this.projectDetail !== undefined &&
        this.projectDetail.productId !== undefined &&
        this.projectDetail.productId.length > 0
      ) {
        projectListSearch.push(this.projectDetail.productId)
        this.$set(value, 'projectList', projectListSearch)
      }

      this.$iBox
        .http(
          'Api.customerListApi',
          {
            type: 'condition',
            value: JSON.stringify(value),
            currPageNo: this.currPageNo + 1,
            pageSize: this.pageSize
          },
          true
        )({})
        .then(res => {
          // 获取客户列表
          console.log(res)
          //去重
          var obj = {}
          let points = res.data.list.reduce(function(item, next) {
            obj[next.customerTel]
              ? ''
              : (obj[next.customerTel] = true && item.push(next))
            return item
          }, [])
          // console.log(points)
          // 排序
          var dateToTime = function(str) {
            return new Date(str.replace(/-/g, '/')).getTime()
          }
          for (var i = 0; i < points.length; i++) {
            points[i].publishTimeNew = dateToTime(points[i].reportedTime)
          }
          points.sort(function(a, b) {
            return b.publishTimeNew > a.publishTimeNew ? 1 : -1
          })
          // console.log(points)
          // 赋值
          this.points = points

          if (res.data !== undefined) {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].remark.length > 0) {
                res.data.list[i].remark = '备注：' + res.data.list[i].remark
              }
              res.data.list[i].isShowRemark = false
              if (res.data.list[i].remark.length > 20) {
                res.data.list[i].isShowRemarkDiplay = true
                res.data.list[i].isShowRemark = true
              } else {
                res.data.list[i].isShowRemarkDiplay = false
              }
            }

            if (this.currPageNo === 0) {
              this.customerList = []
            }

            this.currPageNo =
              this.currPageNo +
              (res.data.list && res.data.list.length === this.pageSize ? 1 : 0)
            for (let i = 0; i < res.data.list.length; i++) {
              this.customerList.push(res.data.list[i])
            }
            // if (this.customerList.length === this.pageSize) {
            //   this.currPageNo += 1
            // }

            Toast('为您加载了' + res.data.list.length + '条数据')
          } else {
            if (this.currPageNo === 0) {
              this.customerList = []
            }
          }

          if (this.customerList.length > 0) {
            this.noData = false
          } else {
            this.noData = true
          }
        })
    },
    goAuthClick() {
      const path = '/pages/userCheck'
      const query = {}
      this.$router.push({ path, query, reLaunch: false })
    },
    goClearProject() {
      if (this.isSelected) {
        this.projectDetail.productId = undefined
        this.projectDetail.productName = undefined
        this.$store.customerAuthReport = undefined
        this.isSelected = false
        this.initData()
      }
    }
  },
  async onPullDownRefresh() {
    // 下拉刷新
    if (this.isPageLogin && this.status === '2') {
      this.currPageNo = 0
      this.initData()
    }
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    console.log('onReachBottom')
    if (this.customerList.length === this.currPageNo * this.pageSize) {
      this.initData()
    }
  },
  created() {},
  onLoad() {},
  mounted() {
    // if (this.isPageLogin && this.status === '2' && !this.noAuth) {
    //   this.initSearchData()
    //   this.initData()
    // }
  },
  onShow() {
    if (this.$store.isLogin) {
      this.isPageLogin = true

      if (this.$store.customerAuthReport !== undefined) {
        this.projectDetail.productId = this.$store.customerAuthReport.id
        this.projectDetail.productName = this.$store.customerAuthReport.name
        this.isSelected = true
        this.$store.customerAuthReport = undefined
        this.currPageNo = 0
        this.initData()
      }

      this.status = this.$store.userInfo.status
      if (this.status === '0') {
        this.noAuthDesc = '您还未设置所属渠道，是否现在去设置'
        this.noAutoButton = true
        this.noAuth = true
      } else if (this.status === '1') {
        this.noAuthDesc = '您的所属渠道申请正在审核中，无法进行操作'
        this.noAuth = true
        this.noAutoButton = false
      } else if (this.status === '2') {
        if (this.noAuth) {
          this.initSearchData()
          this.currPageNo = 0
          this.initData()
        }
        if (
          this.$iBox.isLogout_customer !== undefined &&
          this.$iBox.isLogout_customer
        ) {
          this.initSearchData()
          this.currPageNo = 0
          this.initData()
          this.$iBox.isLogout_customer = false
        }
        this.noAuth = false
        this.noAutoButton = false
      }
    } else {
      this.isSelected = false
      this.isPageLogin = false
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
  height: 0.88rem;
}
.danhang_xuanze h1 {
  float: left;
  font-size: 0.3rem;
  font-weight: bold;
  color: #9498a4;
  margin-left: 0.2rem;
  line-height: 0.88rem;
}
.danhang_xuanze p {
  float: right;
  font-size: 0.3rem;
  font-weight: bold;
  color: #3a4042;
  margin-right: 0.2rem;
  line-height: 0.88rem;
}
.danhang_xuanze .arr_right {
  width: 0.12rem;
  height: 0.22rem;
  float: right;
  margin-top: 0.05rem;
  margin-right: 0.2rem;
  margin-top: 0.335rem;
}
.danhang_xuanze .arr_right_close {
  width: 0.36rem;
  height: 0.36rem;
  float: right;
  margin-top: 0.05rem;
  margin-right: 0.2rem;
  margin-top: 0.275rem;
}
.search_kh {
  width: 7.5rem;
  height: 1.28rem;
  background: #fff;
  overflow: hidden;
}
.search_box {
  width: 7.1rem;
  height: 0.9rem;
  background: #f8f8f8;
  margin: 0 auto;
  border-radius: 100rem;
  margin-top: 0.2rem;
}
.search_left {
  float: left;
  width: 5.3rem;
}
.search_left img {
  width: 0.28rem;
  height: 0.28rem;
  display: block;
  float: left;
  margin-top: 0.31rem;
  margin-left: 0.2rem;
}
.search_left input {
  width: 4.6rem;
  display: block;
  float: left;
  outline: none;
  height: 0.5rem;
  line-height: 0.5rem;
  border: none;
  background: none;
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  border-right: 0.01rem solid #cecece;
}
.search_left p {
  width: 4.6rem;
  display: block;
  float: left;
  color: #7b7b7b;
  outline: none;
  height: 0.5rem;
  line-height: 0.5rem;
  border: none;
  background: none;
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  border-right: 0.01rem solid #cecece;
}
.search_right {
  float: left;
  width: 1.76rem;
}
.search_right img {
  width: 0.32rem;
  height: 0.32rem;
  display: block;
  float: left;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
}
.search_right p {
  display: block;
  float: left;
  font-size: 0.3rem;
  color: #131d35;
  font-weight: bold;
  line-height: 0.9rem;
  margin-left: 0.15rem;
}
/*筛选*/
.shaixuan_box {
  width: 7.5rem;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 0.01rem solid #e5e5e5;
  background: #fff;
  margin-top: 0.2rem;
}
.shaixuan_box ul {
  float: left;
  width: 6.5rem;
  height: 0.9rem;
}
.shaixuan_box ul li {
  float: left;
  width: 1rem;
  height: 0.6rem;
  text-align: center;
  display: block;
  margin-top: 0.19rem;
  margin-left: 0.1rem;
  font-size: 0.26rem;
  background: #ededed;
  color: #bfbfbf;
  line-height: 0.6rem;
}

.shaixuan_box ul .current {
  background: #2d5ad6;
  color: #fff;
}
.shaixuan_right {
  /* background: blue; */
  float: right;
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.3rem;
  margin-right: 0.33rem;
}
/*客户*/
.kehu_body {
  width: 7.5rem;
  padding-bottom: 0.3rem;
}
.kehu_list {
  width: 7.5rem;
  background: #fff;
  padding: 0.2rem 0rem;
  border-bottom: 0.01rem solid #e5e5e5;
  margin-top: 0.1rem;
}
.kehu_list:first-child {
  margin-top: 0rem;
}
.kh_hang01 {
  width: 7.5rem;
}
.kh_hang01 h1 {
  float: left;
  font-size: 0.3rem;
  font-weight: 500;
  color: rgba(19, 29, 53, 1);
  margin-top: 0.1rem;
  margin-left: 0.4rem;
}
.kh_hang01 b {
  float: right;
  font-size: 0.28rem;
  font-weight: 500;
  display: block;
  margin-top: 0.1rem;
  margin-right: 0.4rem;
}
.kh_hang01 .chengjiao {
  color: #19be6b;
}
.kh_hang01 .baobei {
  color: #2d5ad6;
}
.kh_hang02 {
  width: 7.5rem;
}
.kh_hang02 .fangchan_name {
  font-size: 0.2rem;
  font-weight: 400;
  color: #1c2438;
  border-radius: 0.06rem;
  padding: 0.07rem 0.1rem;
  text-align: center;
  line-height: 0.32rem;
  font-style: normal;
  float: left;
  margin-left: 0.4rem;
  margin-top: 0.22rem;
  border: 0.01rem solid #1c2438;
}
.kh_hang03 {
  width: 7.5rem;
}
.kh_hang03 p {
  float: left;
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(148, 152, 164, 1);
  margin-left: 0.4rem;
  margin-top: 0.2rem;
}
.kh_hang04 {
  width: 7.5rem;
}
.kh_hang04 p {
  float: left;
  width: 6rem;
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(148, 152, 164, 1);
  margin-left: 0.4rem;
  margin-top: 0.2rem;
  line-height: 0.34rem;
}
.kh_hang04 .one {
  float: left;
  width: 6rem;
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(148, 152, 164, 1);
  margin-left: 0.4rem;
  margin-top: 0.2rem;
  line-height: 0.34rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.kh_hang04 .arr_down {
  float: right;
  width: 0.24rem;
  height: 0.18rem;
  display: block;
  margin-top: 0.3rem;
  margin-right: 0.4rem;
}
.kh_hang05 {
  float: left;
  width: 4rem;
}
.kh_hang05 img {
  float: left;
  width: 0.32rem;
  height: 0.32rem;
  display: block;
  margin-top: 0.3rem;
  margin-left: 0.4rem;
}
.kh_hang05 p {
  float: left;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(45, 90, 214, 1);
  margin-left: 0.1rem;
  margin-top: 0.3rem;
  display: block;
}
/*弹窗筛选*/
.tanchuang_body {
  width: 7.5rem;
  background: #fff;
  position: relative;
  min-height: 5.2rem;
}
.tanchuang01_box {
  width: 7.5rem;
  padding: 0.3rem 0rem;
}
.tanchuang01_box a {
  float: left;
  width: 2.1rem;
  height: 0.8rem;
  background: #f5f5f5;
  margin-left: 0.3rem;
  margin-top: 0.3rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.28rem;
  display: block;
  color: #333;
  border-radius: 0.04rem;
}
.tanchuang01_box .cutter {
  background: #2d5ad6;
  color: #fff;
}
.tanchuang02_box {
  width: 7.5rem;
  padding: 0.3rem 0rem;
}
.tanchuang02_box ul li {
  height: 1rem;
  line-height: 1rem;
}
.tanchuang02_box ul li p {
  margin-left: 0.3rem;
  line-height: 0.8rem;
  font-size: 0.34rem;
  display: block;
  color: rgb(27, 35, 50);
  border-radius: 0.04rem;
}
.tanchuang02_box ul li .cutter {
  color: #2d5ad6;
}
.tanchuanganniu_box {
  width: 7.5rem;
  height: 1.4rem;
  background: #fff;
  position: absolute;
  bottom: 0rem;
  left: 0rem;
}
.tanchuanganniu_box a {
  width: 3.3rem;
  margin: 0 auto;
  margin-top: 0.25rem;
  float: left;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  background: #af8f84;
  border-radius: 0.12rem;
  color: #fff;
  text-align: center;
  font-size: 0.3rem;
  display: block;
  margin-left: 0.3rem;
}
</style>
