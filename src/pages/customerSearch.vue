<template>
  <div id="app">
    <!--搜索-->
    <div class="search_kh">
      <div class="search_box">
        <div class="search_left">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/sousuo_icon.png" />
          <input placeholder="输入客户姓名或手机号 " v-model="name" focus="true" />
        </div>
        <div class="search_right" @click="goSearchClick">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/ss_icon.png" />
          <p>搜索</p>
        </div>
        <div class="clr"></div>
      </div>
    </div>
    <div style="height:3.8rem;"></div>
    <!--客户-->
    <div class="kehu_body">
      <div
        class="kehu_list"
        v-for="(item, index) in customerList"
        :key="index"
        @click="goDetailClick(item)"
      >
        <div class="kh_hang01">
          <h1>{{item.customerName}}{{item.customerRealName.length === 0 ? '' : '（' + item.customerRealName + '）'}}</h1>
          <b :class="item.status == '1' ? 'baobei' : 'chengjiao'">{{item.statusValue}}</b>
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
    <div v-show="noData" class="wdl_box">
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
      customerList: [],
      noData: false,
      name: ''
    }
  },
  components: {},
  methods: {
    goSearchClick() {
      this.$iBox
        .http(
          'Api.customerListApi',
          {
            type: 'search',
            value: this.name,
            currPageNo: '1',
            pageSize: '20'
          },
          true
        )({})
        .then(res => {
          console.log(res)

          if (res.data !== undefined && res.data.list !== undefined) {
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
            this.customerList = res.data.list
          } else {
            this.customerList = []
          }
          if (this.customerList.length > 0) {
            this.noData = false
          } else {
            Toast(res.message)
            this.noData = true
          }
        })
    },
    goDetailClick(item) {
      const path = '/pages/customerDetail'
      const query = {
        customerId: item.customerId
      }
      this.$router.push({ path, query, reLaunch: false })
    }
  },
  created() {},
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

.search_kh {
  width: 7.5rem;
  height: 1.28rem;
  background: #fff;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  top: 0rem;
  left: 0rem;
  border-bottom: 0.01rem solid #ececec;
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
  width: 0.3rem;
  height: 0.3rem;
  display: block;
  float: left;
  margin-top: 0.31rem;
  margin-left: 0.5rem;
}
.search_left input {
  width: 4.2rem;
  display: block;
  float: left;
  border-radius: 0rem;
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
  width: 0.42rem;
  height: 0.42rem;
  display: block;
  float: left;
  margin-top: 0.25rem;
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
  width: 1.2rem;
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
.shaixuan_box img {
  float: right;
  width: 0.34rem;
  height: 0.34rem;
  margin-top: 0.33rem;
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
</style>
