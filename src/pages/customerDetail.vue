<template>
  <div id="app" style=" background:#F8F8F8;">
    <div v-show="isShow">
      <!--客户信息-->
      <div class="khinfo_body">
        <div class="khinfo_box">
          <div class="khinfo_tit">
            <h1>{{customerDetail.customerName}}{{customerDetail.customerRealName !== undefined ? customerDetail.customerRealName.length === 0 ? '' : '（' + customerDetail.customerRealName + '）' : ''}}</h1>
            <h2 @click="goChangeClick(customerDetail)">变更信息</h2>
          </div>
          <div class="fang_box">
            <div class="fang_list">
              <div class="fang_left">
                <img
                  :src="customerDetail.projectList !== undefined ? customerDetail.projectList.projectImg : ''"
                />
              </div>
              <div class="fang_right" v-if="customerDetail.projectList !== undefined">
                <ul>
                  <li>
                    <h1>{{customerDetail.projectList.projectName}}</h1>
                  </li>
                  <li>
                    <p>{{customerDetail.projectList.projectArea}}</p>
                  </li>
                  <li>
                    <p>面积：{{customerDetail.projectList.projectBuildArea}}</p>
                  </li>
                  <li>
                    <h2>
                      {{customerDetail.projectList.unitPrice}}
                      <span>{{customerDetail.projectList.mainHouseType}}</span>
                    </h2>
                  </li>
                </ul>
                <a class="zhuzhai">{{customerDetail.projectList.projectDensity}}</a>
                <a
                  class="zaishou"
                  :style="customerDetail.projectList.status === 'onsale' ? 'background:#19BE6B' : 'background:#bbbec4'"
                >{{customerDetail.projectList.statusValue}}</a>
              </div>
            </div>
            <div class="kh_xinxi_box">
              <div class="kh_xinxi_list">
                <p>手机号码：</p>
                <b>{{customerDetail.customerTel}}</b>
              </div>
              <div class="kh_xinxi_list">
                <p>推荐日期：</p>
                <b>{{customerDetail.reportDate}}</b>
              </div>
              <div class="kh_xinxi_list">
                <p>失效日期：</p>
                <b>{{customerDetail.reportValidDate}}</b>
              </div>
              <div class="kh_xinxi_list">
                <p>预约看房日期：</p>
                <b>{{customerDetail.orderHouseDate}}</b>
              </div>
              <div class="kh_xinxi_list">
                <p>实际到访日期：</p>
                <b>{{customerDetail.actualVisitDate}}</b>
              </div>
              <div class="kh_xinxi_list">
                <p>置业顾问：</p>
                <b>{{customerDetail.homeBuyConsultant}}</b>
              </div>
              <div class="kh_xinxi_list">
                <p>客户状态：</p>
                <b>{{customerDetail.statusValue}}</b>
              </div>
              <div class="kh_xinxi_remark_list">
                <p>备注：</p>
                <b>{{customerDetail.remark}}</b>
              </div>
              <!-- 客户备注 -->
              <div class="textContent">
                <textarea placeholder="客户维护:" v-model="memo"></textarea>
              </div>
              <div class="remarkbtn">
                <a @click.prevent="remarkSubmitClick">确认</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--交易信息-->
      <div
        class="loupaninfo_body"
        v-if="customerDetail.tradeList !== undefined && customerDetail.tradeList.length > 0"
      >
        <div class="loupaninfo_box">
          <div class="loupaninfo_tit">
            <h1>交易信息（{{customerDetail.tradeList.length}}）</h1>
          </div>
          <div class="kh_xinxi_box" v-for="(item, index) in customerDetail.tradeList" :key="index">
            <div class="kh_xinxi_list">
              <p>{{item.tradeHouseNo}}</p>
              <i style=" background:orange;">{{item.statusValue}}</i>
              <i>{{item.tradeSubscriptionStatusValue}}</i>
            </div>
            <div class="kh_xinxi_list">
              <p>客户：</p>
              <b>{{item.tradeCustomerName}}</b>
            </div>
            <div class="kh_xinxi_list">
              <p>业态：</p>
              <b>{{item.tradeFormat}}</b>
            </div>
            <div class="kh_xinxi_list">
              <p>可结算佣金：</p>
              <b>{{item.tradeSettleableCommission}}</b>
            </div>
            <div class="kh_xinxi_list">
              <p>已结算佣金：</p>
              <b>{{item.tradeSettledCommission}}</b>
            </div>
            <div class="kh_xinxi_list">
              <p>交易时间：</p>
              <b>{{item.tradeDate}}</b>
            </div>
            <div class="kh_xinxi_list">
              <p>成交周期：</p>
              <b>{{item.tradeCycle}}天</b>
            </div>
          </div>
          <div class="fengge_box"></div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      customerId: '',
      customerDetail: {},
      isShow: false,
      memo: ''
    }
  },
  components: {},
  methods: {
    // 备注
    remarkSubmitClick() {
      // console.log(this.memo)
      if (this.memo.length === 0) {
        return
      }
      this.$iBox
        .http('Api.customerDetailChangeApi', {
          customerId: this.customerId,
          memo: this.memo
        })({})
        .then(res => {
          console.log(res)
        })
    },
    goChangeClick(item) {
      const path = '/pages/customerChange'
      const query = {
        customerId: item.customerId
      }
      this.$router.push({ path, query, reLaunch: false })
    },
    //获取客户详情
    initData() {
      this.$iBox
        .http('Api.customerDetailApi', {
          customerId: this.customerId
        })({})
        .then(res => {
          console.log(res)

          this.customerDetail = res.data
          this.isShow = true
        })
    }
  },
  created() {},
  onLoad() {},
  mounted() {
    this.initData()
  },
  onUnload() {
    this.isShow = false
  },
  onShow() {
    this.customerId = this.$root.$mp.query.customerId
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

/*客户信息*/
.khinfo_body {
  width: 7.5rem;
  background: #fff;
  padding: 0.3rem 0rem 0rem 0rem;
}
.khinfo_box {
  width: 6.7rem;
  margin: 0 auto;
  padding-top: 0.2rem;
}
.khinfo_tit {
  width: 6.7rem;
  margin: 0 auto;
}
.khinfo_tit h1 {
  font-size: 0.36rem;
  font-weight: 500;
  color: rgba(19, 29, 53, 1);
  padding-bottom: 0.2rem;
  float: left;
  line-height: 0.3rem;
}
.khinfo_tit h2 {
  font-size: 0.28rem;
  font-weight: 400;
  color: #9498a4;
  padding-bottom: 0.2rem;
  float: right;
  line-height: 0.3rem;
}

.fang_box {
  width: 6.7rem;
  margin: 0 auto;
}
.fang_list {
  width: 6.7rem;
  height: 2.38rem;
  border-bottom: 0.01rem solid #e5e5e5;
  margin: 0 auto;
}
.fang_list .fang_left {
  float: left;
  width: 2.1rem;
  height: 1.6rem;
  margin-top: 0.4rem;
}
.fang_list .fang_left img {
  width: 2.1rem;
  height: 1.6rem;
}
.fang_list .fang_right {
  float: left;
  width: 2.1rem;
  height: 1.6rem;
  margin-top: 0.4rem;
  width: 4.2rem;
  margin-left: 0.3rem;
  position: relative;
}
.fang_list .fang_right h1 {
  font-size: 0.32rem;
  font-weight: 500;
  color: rgba(19, 29, 53, 1);
  line-height: 0.44rem;
}
.fang_list .fang_right p {
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(156, 158, 160, 1);
  line-height: 0.34rem;
  margin-top: 0.04rem;
}
.fang_list .fang_right h2 {
  font-size: 0.3rem;
  font-weight: 500;
  color: rgba(231, 98, 75, 1);
  line-height: 0.42rem;
  margin-top: 0.08rem;
}
.fang_list .fang_right h2 span {
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(156, 158, 160, 1);
  line-height: 0.34rem;
  margin-left: 0.4rem;
}
.fang_list .fang_right .zaishou {
  width: 0.65rem;
  height: 0.36rem;
  background: #19be6b;
  border-radius: 0.04rem;
  font-size: 0.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 0.38rem;
  display: block;
  position: absolute;
  right: -0.12rem;
  top: 0.04rem;
}
.fang_list .fang_right .zhuzhai {
  width: 0.65rem;
  height: 0.34rem;
  border-radius: 0.04rem;
  font-size: 0.2rem;
  font-weight: 500;
  color: #495060;
  text-align: center;
  line-height: 0.36rem;
  display: block;
  position: absolute;
  right: 0.65rem;
  top: 0.04rem;
  border: 0.01rem solid #495060;
}
.kh_xinxi_box {
  width: 6.7rem;
  position: relative;
}

.kh_xinxi_list {
  width: 6.7rem;
  height: 0.86rem;
  margin: 0 auto;
  border-bottom: 0.01rem solid #e5e5e5;
  display: block;
}
.kh_xinxi_list:last-child {
  border-bottom: none;
}
.kh_xinxi_list p {
  float: left;
  font-size: 0.28rem;
  font-weight: normal;
  color: #9498a4;
  line-height: 0.86rem;
  text-align: left;
}
.kh_xinxi_list b {
  float: right;
  font-size: 0.28rem;
  font-weight: normal;
  color: #3a4042;
  line-height: 0.86rem;
  text-align: right;
}
.kh_xinxi_list i {
  float: right;
  font-size: 0.24rem;
  font-weight: normal;
  color: #fff;
  line-height: 0.86rem;
  text-align: right;
  padding: 0rem 0.2rem;
  height: 0.5rem;
  background: green;
  text-align: center;
  line-height: 0.5rem;
  text-decoration: none;
  font-style: normal;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
  border-radius: 0.08rem;
}
.kh_xinxi_remark_list {
  border-bottom: 0.01rem solid #e5e5e5;
  margin-bottom: 0.2rem;
}
.kh_xinxi_remark_list p {
  float: left;
  font-size: 0.28rem;
  font-weight: normal;
  color: #9498a4;
  line-height: 0.86rem;
  text-align: left;
}
.kh_xinxi_remark_list b {
  float: right;
  font-size: 0.28rem;
  font-weight: normal;
  color: #3a4042;
  text-align: right;
  padding-top: 0.2rem;
  width: 5.5rem;
  padding-bottom: 0.2rem;
}

/* 文本域 备注*/
.textContent {
  width: 6.7rem;
  height: 4rem /* 50/16 */;
  background: #e5e5e5;
  margin-bottom: 0.02rem;
}
.remarkbtn {
  width: 1.5rem;
  height: 1rem;
}
.remarkbtn a {
  width: 1.5 rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #fff;
  background: #2d5ad6;
  text-align: center;
  display: block;
}

/*楼盘信息*/
.loupaninfo_body {
  width: 7.5rem;
  background: #fff;
  padding: 0.3rem 0rem 0rem 0rem;
  margin-top: 0.2rem;
}
.loupaninfo_box {
  width: 6.7rem;
  margin: 0 auto;
}
.loupaninfo_tit {
  width: 6.7rem;
  margin: 0 auto;
}
.loupaninfo_tit h1 {
  font-size: 0.36rem;
  font-weight: 500;
  color: rgba(19, 29, 53, 1);
  padding-bottom: 0.2rem;
}
.loupaninfo_box ul li p {
  float: left;
  font-size: 0.28rem;
  font-weight: normal;
  color: #9498a4;
  line-height: 0.6rem;
  text-align: left;
  width: 1.4rem;
}
.loupaninfo_box ul li b {
  float: left;
  font-size: 0.28rem;
  font-weight: normal;
  color: #3a4042;
  line-height: 0.6rem;
  text-align: left;
  width: 5rem;
}
.ssuo img {
  width: 0.3rem;
  margin: 0 auto;
  display: block;
  padding: 0.2rem 0rem;
}
</style>
