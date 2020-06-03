<template>
  <div id="app">
    <div v-show="isShow">
      <div v-show="isPageLogin">
        <!--房产-->
        <div class="fang_body">
          <div class="fang_box" @click="goProjectClick">
            <div class="fang_list">
              <div class="fang_left"> <img :src="projectDetail.mainImg" @error="errorfn(index)"/> </div>
              <div class="fang_right">
                <ul>
                  <li>
                    <h1>{{projectDetail.name}}</h1>
                  </li>
                  <li>
                    <p>{{projectDetail.district}} | {{projectDetail.plate}}</p>
                  </li>
                  <li>
                    <p>面积：{{projectDetail.buildArea}}</p>
                  </li>
                  <li>
                    <h2>{{projectDetail.averagePrice}}<span>{{projectDetail.mainHouseType}}</span></h2>
                  </li>
                </ul>
                <a class="zhuzhai">{{projectDetail.buildType}}</a> <a class="zaishou" :style="projectDetail.sellState === 'onsale' ? 'background:#19BE6B' : 'background:#bbbec4'">{{projectDetail.sellStateName}}</a>
              </div>
            </div>
          </div>
        </div>
        <!--填写-->
        <div class="tianxie_box">
          <div class="danhang_shuru">
            <p>客户姓名：</p>
            <input placeholder="请输入客户姓名" v-model="customerName"/>
          </div>
          <div class="danhang_shuru">
            <p>手机号码：</p>
            <input placeholder="请输入客户手机号" type="number" v-model.trim="customerTel"/>
          </div>
          <div class="danhang_shuru">
            <p>性别：</p>
            <div class="xingbie_box">
              <!--<div class="boy" @click="isMale = true"><img :src="isMale ? '/static/images/rad_y.png' : '/static/images/rad_n.png'"/><a>男</a></div>-->
              <!--<div class="girl" @click="isMale = false"><img :src="isMale ? '/static/images/rad_n.png' : '/static/images/rad_y.png'"/><a>女</a></div>-->
              <i-cell-group>
                <i-cell title="自定义内容">
                  <i-switch :value="remale" size="large" @change="onChange($event)" slot="footer">
                    <view slot="open">女</view>
                    <view slot="close">男</view>
                  </i-switch>
                </i-cell>
              </i-cell-group>
            </div>
          </div>
          <!--<div class="danhang_shuru">-->
          <!--<p>客户有效截止日期：</p>-->
          <!--<p @click="goValidClick" class="date" :style="validDate === '请选择有效截止日期' ? 'color:rgba(133,133,133,1)' : 'color:rgba(32,32,32,1)'">{{validDate}}</p>-->
          <!--</div>-->
          <div class="danhang_shuru">
            <p>预约看房日期：</p>
            <p @click="goOrderClick" class="date" :style="orderDate === '请选择预约看房日期' ? 'color:rgba(133,133,133,1)' : 'color:rgba(32,32,32,1)'">{{orderDate}}</p>
          </div>
          <div class="danhang_shuru" v-show="customerValidDate.length > 0">
            <p>失效日期：</p>
            <p class="date" style="color:rgba(32,32,32,1)">{{customerValidDate}}</p>
          </div>
          <div class="duohang_shuru" v-show="(showValidDate === showOrderDate) && !showValidDate">
            <textarea placeholder="请输入备注信息" v-model="remark"></textarea>
          </div>
        </div>
        <!--固定底部按钮-->
        <div style="height: 1rem;"></div>
        <div class="ding_bot_btn"> <a @click="goSubmitClick">提交</a> </div>
      </div>
      <van-popup
        :show="showValidDate"
        @close="showValidDate = false" duration="500" position="bottom"
      >
        <van-datetime-picker
          type="date"
          @input="onValidInput"
          :value="validDateCurrent"
          :min-date="minDate"
          :max-date="maxDate"
          visible-item-count="5"
          @confirm="onSelectValidDateClick"
          @cancel="showValidDate = false"
        />
      </van-popup>
      <van-popup
        :show="showOrderDate"
        @close="showOrderDate = false" duration="500" position="bottom"
      >
        <van-datetime-picker
          type="date"
          @input="onOrderInput"
          :value="orderDateCurrent"
          :min-date="minDate"
          :max-date="maxDate"
          visible-item-count="5"
          @confirm="onSelectOrderDateClick"
          @cancel="showOrderDate = false"
        />
      </van-popup>
      <div v-show="!isPageLogin" class="wdl_box">
        <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/weidenglu_icon.png"/>
        <p>您当前未登录账号，无法进行操作</p>
        <p>请登录后方可进行操作</p>
        <a class="button" @click="goLoginClick">去登录</a>
      </div>
      <van-toast id="van-toast" />
    </div>
  </div>
</template>

<script>
  import Toast from '../../static/vant/toast/toast'

  export default {
    data () {
      return {
        isShow: false,
        remale: false,
        isPageLogin: false,
        customerName: '',
        customerTel: '',
        remark: '',
        customerValidDate: '',
        validDate: '请选择有效截止日期',
        orderDate: '请选择预约看房日期',
        validDateCurrent: new Date().getTime(),
        orderDateCurrent: new Date().getTime(),
        showValidDate: false,
        showOrderDate: false,
        minDate: new Date().getTime(),
        maxDate: new Date(2022, 0, 1).getTime(),
        projectId: '',
        projectDetail: {}
      }
    },
    components: {
    },
    methods: {
      onChange (event) {
        const detail = event.mp.detail
        this.remale = detail.value
      },
      goValidClick () {
        this.showValidDate = true
      },
      goOrderClick () {
        this.showOrderDate = true
      },
      onSelectValidDateClick () {
        this.validDate = this.formatDate(this.validDateCurrent)
        this.showValidDate = false
      },
      onSelectOrderDateClick () {
        this.orderDate = this.formatDate(this.orderDateCurrent)
        this.showOrderDate = false
      },
      goProjectClick () {
        const path = '/pages/projectListAuth'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      formatDate (value) {
        let date = new Date(value)
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let str = y + '-' + MM + '-' + d
        return str
      },
      onValidInput (event) {
        this.validDateCurrent = event.mp.detail
      },
      onOrderInput (event) {
        this.orderDateCurrent = event.mp.detail
      },
      goLoginClick () {
        const path = '/pages/login'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goSubmitClick () {
        let _this = this
        if (this.projectId.length === 0) {
          Toast('请选择项目')
          return
        }
        if (this.customerName.length === 0) {
          Toast('请输入客户姓名')
          return
        }

        this.customerTel = this.customerTel.replace(/[^0-9]/ig, '')
        if (this.customerTel.length !== 11) {
          Toast('请输入有效的手机号')
          return
        }

        if (this.orderDate === '请选择预约看房日期') {
          Toast('请选择预约看房日期')
          return
        }
        _this.$iBox.http('Api.reportSubmitApi', {
          'projectId': _this.projectId,
          'customerName': _this.customerName,
          'customerTel': _this.customerTel,
          'orderHouseDate': _this.orderDate,
          'customerSex': _this.remale === true ? '女' : '男',
          'remark': _this.remark
        }, true)({}).then(() => {
          Toast('提交成功')
          _this.clearData()
        })
        /* let uid = '2aVdp40KGjQhwddWsTHDntk9m0Uyf7cndyolXtu_9m0'
        wx.requestSubscribeMessage({
          tmplIds: [uid],
          success (res) {
            if (res[uid] === 'accept') {
              console.log('允许')
              _this.$iBox.http('Api.reportSubmitApi', {
                'projectId': _this.projectId,
                'customerName': _this.customerName,
                'customerTel': _this.customerTel,
                'orderHouseDate': _this.orderDate,
                'customerSex': _this.remale === true ? '女' : '男',
                'remark': _this.remark
              }, true)({}).then(() => {
                Toast('提交成功')
                _this.clearData()
              })
            }
          }
        }) */
        /* this.$iBox.http('Api.reportSubmitApi', {
          'projectId': this.projectId,
          'customerName': this.customerName,
          'customerTel': this.customerTel,
          'customerSex': this.remale === true ? '女' : '男',
          'orderHouseDate': this.orderDate,
          'remark': this.remark
        }, true)({}).then(() => {
          Toast('提交成功')
          this.clearData()
        }) */
        // wx.showLoading({
        //   title: '保存中',
        //   mask: true
        // })
        // setTimeout(() => {
        //   wx.hideLoading()
        //
        // }, 2000)
      },
      clearData () {
        this.customerName = ''
        this.customerTel = ''
        this.remark = ''
        this.orderDate = '请选择预约看房日期'
      },
      initProjectData () {
        this.$iBox.http('Api.projectListForCustomerApi', {
          'type': 'id',
          'value': this.projectId
        }, true)({}).then((res) => {
          if (res.data.list.length > 0) {
            this.isShow = true
            this.projectDetail = res.data.list[0]
            this.customerValidDate = res.data.list[0].validDate === undefined ? '' : res.data.list[0].validDate
          }
        })
      }
    },
    mounted () {
      this.initProjectData()
    },
    created () {
      this.validDate = this.formatDate(new Date().getTime())
    },
    onLoad () {
    },
    onUnload () {
      this.isShow = false
      this.remale = false
      this.isPageLogin = false
      this.customerName = ''
      this.customerTel = ''
      this.remark = ''
      this.projectId = ''
      this.projectDetail = {}
    },
    onShow () {
      if (this.$store.isLogin) {
        this.orderDateCurrent = new Date().getTime()
        this.isPageLogin = true
        this.projectId = this.$root.$mp.query.projectId
        if (this.$store.customerAuthReport !== undefined) {
          this.projectDetail = this.$store.customerAuthReport
          this.projectId = this.projectDetail.id
          this.customerValidDate = this.projectDetail.validDate === undefined ? '' : this.projectDetail.validDate
          this.$store.customerAuthReport = undefined
        }
      } else {
        this.isPageLogin = false
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
  /*房产区域*/
  .fang_body{ width:7.5rem; background:#fff;    border-bottom: 0.01rem solid #E5E5E5;}
  .fang_box{ width:6.7rem;margin:0 auto; background:#fff;}
  .fang_list{ width:6.7rem; height:2.38rem; border-bottom:0.01rem solid #E5E5E5; margin:0 auto;}
  .fang_list:last-child{border-bottom:none;}
  .fang_list .fang_left{ float:left; width:2.1rem; height:1.6rem; margin-top:0.4rem;}
  .fang_list .fang_left img{ width:2.1rem; height:1.6rem; }
  .fang_list .fang_right{ float:left; width:2.1rem; height:1.6rem; margin-top:0.4rem; width:4.2rem; margin-left:0.3rem; position:relative;}
  .fang_list .fang_right h1{font-size:0.32rem; font-weight:500;color:rgba(19,29,53,1);line-height:0.44rem; }
  .fang_list .fang_right p{font-size:0.24rem; font-weight:400;color:rgba(156,158,160,1);line-height:0.34rem;margin-top:0.04rem;}
  .fang_list .fang_right h2{font-size:0.3rem; font-weight:500;color:rgba(231,98,75,1);line-height:0.42rem;margin-top:0.08rem;
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
  .fang_list .fang_right h2 span{font-size:0.24rem; font-weight:400;color:rgba(156,158,160,1);line-height:0.34rem; margin-left:0.4rem;}
  .fang_list .fang_right .zaishou{width:0.65rem;height:0.36rem;background:#19BE6B;border-radius:0.04rem; font-size:0.2rem;
    font-weight:500;color:rgba(255,255,255,1); text-align:center; line-height:0.38rem; display:block; position:absolute;right:-0.12rem; top:0.04rem;}
  .fang_list .fang_right .zhuzhai{width:0.65rem;height:0.34rem;border-radius:0.04rem; font-size:0.2rem;
    font-weight:500;color:#495060; text-align:center; line-height:0.36rem; display:block; position:absolute;right:0.65rem; top:0.04rem;border: 0.01rem solid #495060}
  /*单行输入*/
  .danhang_shuru{ width:7.5rem; height:0.9rem; background:#fff; border-bottom:0.01rem solid #E6E6E6}
  .danhang_shuru p{ float:left; display:block; font-size:0.3rem; font-weight:400;color:rgba(51,51,51,1); line-height:0.9rem; margin-left:0.2rem;}
  .danhang_shuru input{ float:right;height:0.42rem;font-size:0.3rem; font-weight:400;
    line-height:0.42rem; margin-top:0.24rem; margin-right:0.2rem; border:none; background:none;outline: none; text-align:right;}
  .danhang_shuru .date{ float:right;height:0.42rem;font-size:0.3rem; font-weight:400;
    line-height:0.42rem; margin-top:0.24rem; margin-right:0.2rem; border:none; background:none;outline: none; text-align:right;}
  /*多行输入*/
  .duohang_shuru{ width:7.5rem; height:2.6rem; background:#fff; border-bottom:0.01rem solid #E6E6E6}
  .duohang_shuru textarea{ width:7.1rem; padding:0.2rem;font-size:0.3rem; font-weight:400; height:2.1rem; outline: none;border:none; background:none;}
  /*固定底部按钮*/
  .ding_bot_btn{ width:7.5rem;  height:1rem; position:fixed; bottom:0rem; left:0rem;}
  .ding_bot_btn a{ width:7.5rem;  height:1rem; line-height:1rem; font-size:0.3rem; color:#fff; background:#2D5AD6; text-align: center; display:block;}
  .danhang_shuru .xingbie_box{ float:right;margin-top:0.18rem;margin-right:0.2rem;}
  .danhang_shuru .xingbie_box .boy{ float:left; margin-right:0.4rem;}
  .danhang_shuru .xingbie_box .girl{ float:left; margin-right:0.2rem;}
  .danhang_shuru .xingbie_box .boy img{ float:left; width:0.45rem; height:0.45rem; margin-top:0.225rem;}
  .danhang_shuru .xingbie_box .boy a{ float:left; font-size:0.3rem; line-height:0.9rem; margin-left:0.05rem;}
  .danhang_shuru .xingbie_box .girl img{ float:left;width:0.45rem; height:0.45rem; margin-top:0.225rem;}
  .danhang_shuru .xingbie_box .girl a{ float:left; font-size:0.3rem;line-height:0.9rem; margin-left:0.05rem;}
</style>
