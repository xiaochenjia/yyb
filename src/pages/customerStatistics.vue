<template>
  <div id="app" style="background:#fff;">
    <!--单行选择-->
    <div class="danhang_xuanze" @click="goProjectListClick">
      <h1>选择项目：</h1>
      <img :class="isSelected ? 'arr_right_close' : 'arr_right'" @click.stop="goClearProject()" :src="isSelected ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/close_project.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-right@3x.png'"/>
      <p>{{projectDetail.productId !== undefined ? projectDetail.productName : '请选择项目'}}</p>
    </div>
    <!--筛选行-->
    <div class="shaixuan_box">
      <ul>
        <li v-for="(item, index) in statusList" :key="index" :class="item.isSelected ? 'current' : ''" @click="selectStatusClick(item)">
          <a>{{item.statusName}}</a>
        </li>
      </ul>
      <img class="shaixuan_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/rili_icon.png" @click="goDateClick"/>
      <div class="time_box" v-show="showSelectDate">
        <p>{{startDate}}</p>
        <h2>至</h2>
        <p>{{endDate}}</p>
      </div>
    </div>
    <!--数据展示-->
    <div class="shuju_txt">
      <ul>
        <li v-for="(obj, index) in dataList" :key="index" v-if="obj.name !== undefined">
          <i v-if="index === 0" class="i_01"></i>
          <i v-else-if="index === 1" class="i_02"></i>
          <i v-else-if="index === 2" class="i_03"></i>
          <i v-else-if="index === 3" class="i_04"></i>
          <p>{{obj.name}}</p>
          <h1>{{obj.value}}</h1>
        </li>
      </ul>
    </div>
    <!--数据图ECHAT-->
    <div class="shuju_tu" v-show="echartsShow">
      <mpvue-echarts :echarts="echarts" :onInit="initChart" canvasId="customer-canvas"/>
    </div>
    <van-popup
      :show="showDate"
      @close="onSelectDateClick" position="top" duration="500"
    >
      <div class="tanchuang_body">
        <div class="yewu_box">
          <div class="mingxi_tit">
            <h1>开始日期</h1>
          </div>
          <van-datetime-picker
            type="date"
            @input="onStartInput"
            :value="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            visible-item-count="3"
            @confirm="onSelectDateClick"
            @cancel="onSelectDateClick"
            :show-toolbar="false"
          />
        </div>
        <div class="yewu_box">
          <div class="mingxi_tit">
            <h1>结束日期</h1>
          </div>
          <van-datetime-picker
            type="date"
            :value="currentDate"
            visible-item-count="3"
            @input="onEndInput"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onSelectDateClick"
            @cancel="onSelectDateClick"
            :show-toolbar="false"
          />
        </div>

        <div class="tanchuanganniu_box"> <a style=" background:#66C18F;">重置</a><a style="background:#4270ED" @click="goSelectDateClick">确定</a> </div>
      </div>
    </van-popup>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import * as echarts from '../../static/js/echarts/echarts.min'
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null

  export default {
    data () {
      return {
        echarts,
        showSelectDate: false,
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
        showDate: false,
        minDate: new Date(2016, 0, 1).getTime(),
        maxDate: new Date(2020, 0, 1).getTime(),
        currentDate: new Date().getTime(),
        echartsShow: true,
        statusList: [],
        dataList: [],
        projectDetail: {},
        statusListSearch: '',
        isSelected: false
      }
    },
    components: {
      mpvueEcharts
    },
    methods: {
      goClearProject () {
        if (this.isSelected) {
          this.projectDetail.productId = undefined
          this.projectDetail.productName = undefined
          this.$store.customerAuthReport = undefined
          this.isSelected = false
          this.initData()
        }
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
      onStartInput (event) {
        this.startDate = event.mp.detail
      },
      onEndInput (event) {
        this.endDate = event.mp.detail
      },
      goSelectDateClick () {
        if (this.startDate !== '') {
          this.startDate = this.formatDate(this.startDate)
        }

        if (this.endDate !== '') {
          this.endDate = this.formatDate(this.endDate)
        }
        this.showDate = false
        // 清空选择
        for (let i = 0; i < this.statusList.length; i++) {
          this.statusList[i].isSelected = false
        }
        setTimeout(() => {
          this.echartsShow = true
        }, 500)
        this.showSelectDate = true

        this.initData()
      },
      selectStatusClick (item) {
        this.showSelectDate = false
        for (let i = 0; i < this.statusList.length; i++) {
          this.statusList[i].isSelected = false
        }

        if (!item.isSelected) {
          item.isSelected = !item.isSelected
        }

        this.statusListSearch = ''
        if (item.isSelected) {
          this.statusListSearch = item.statusCode
        }

        this.initData()
      },
      goProjectListClick () {
        const path = '/pages/projectListAuth'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goDrillClick () {
        this.$router.back()
      },
      goDateClick () {
        this.showDate = true
        setTimeout(() => {
          this.echartsShow = false
        }, 200)
      },
      onSelectDateClick () {
        this.showDate = false
        this.showSelectDate = false
        setTimeout(() => {
          this.echartsShow = true
        }, 500)
      },
      loadData () {
        let data = []
        if (this.dataList.length > 0) {
          for (let i = 0; i < this.dataList.length; i++) {
            let obj = {
              'value': this.dataList[i].value,
              'name': this.dataList[i].name + ':' + this.dataList[i].value
            }
            data.push(obj)
          }
        }
        if (data.length > 0) {
          let option = {
            calculable: false,
            series: [
              {
                type: 'pie',
                color: [
                  '#B558F6',
                  '#F65860',
                  '#FEC400',
                  '#29CB97'
                ],
                radius: '55%',
                center: ['50%', '60%'],
                data: data
              }
            ]
          }
          chart.setOption(option)
        }
      },
      initChart (canvas, width, height) {
        chart = echarts.init(canvas, 'light', {
          width: width,
          height: height
        })
        canvas.setChart(chart)
        return chart
      },
      async getMachineStateInfo () {
        setTimeout(() => {
          this.loadData()
        }, 1000)
      },
      initSearch () {
        this.$iBox.http('Api.customerStatisticsConditionListApi')({}).then((res) => {
          for (let i = 0; i < res.data.typeList.length; i++) {
            if (res.data.typeList[i].statusCode === '-1') {
              res.data.typeList[i].isSelected = true
            } else {
              res.data.typeList[i].isSelected = false
            }
          }
          this.statusList = res.data.typeList
          this.initData()
        })
      },
      initData () {
        // 根据条件
        let value = {}
        if (!this.showSelectDate) {
          if (this.statusListSearch.length > 0) {
            this.$set(value, 'typeList', this.statusListSearch)
          }
        }

        if (this.projectDetail !== undefined && this.projectDetail.productId !== undefined && this.projectDetail.productId.length > 0) {
          this.$set(value, 'projectList', this.projectDetail.productId)
        }

        let startDateTemp = ''
        let endDateTemp = ''
        if (this.showSelectDate) {
          startDateTemp = this.startDate
          endDateTemp = this.endDate

          this.$set(value, 'beginDate', startDateTemp)
          this.$set(value, 'endDate', endDateTemp)
        }

        this.$iBox.http('Api.customerStatisticsApi', {
          'type': this.showSelectDate ? 'date' : 'type',
          'value': JSON.stringify(value)
        }, true)({}).then((res) => {
          this.dataList = res.data.list
          this.getMachineStateInfo()
        })
      }
    },
    created () {
    },
    mounted () {
      this.initSearch()
    },
    onLoad () {
      this.showSelectDate = false
      this.startDate = false
      this.endDate = false
    },
    onUnload () {
      this.showSelectDate = false
      this.showDate = false
      this.echartsShow = true
      this.statusList = []
      this.dataList = []
      this.projectDetail = {}
      this.statusListSearch = ''
      this.isSelected = false
    },
    onShow () {
      if (this.$store.customerAuthReport !== undefined) {
        this.projectDetail.productId = this.$store.customerAuthReport.id
        this.projectDetail.productName = this.$store.customerAuthReport.name
        this.isSelected = true
        this.$store.customerAuthReport = undefined
        this.initData()
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
  .danhang_xuanze{ width:7.5rem; background:#fff; border-bottom:0.01rem solid #E5E5E5; height:0.88rem;}
  .danhang_xuanze h1{ float:left; font-size:0.3rem; font-weight:bold;color:#9498A4; margin-left:0.2rem; line-height:0.88rem;}
  .danhang_xuanze p{ float:right; font-size:0.3rem; font-weight:bold;color:#3A4042; margin-right:0.2rem; line-height:0.88rem;}
  .danhang_xuanze .arr_right{  width:0.12rem;height: 0.22rem; float: right; margin-top: 0.05rem; margin-right:0.2rem; margin-top:0.335rem;}
  .danhang_xuanze .arr_right_close{width:0.36rem;height: 0.36rem; float: right; margin-top: 0.05rem; margin-right:0.2rem; margin-top:0.275rem;}
  /*筛选*/
  .shaixuan_box { width:7.5rem; padding:0.2rem 0rem;line-height: 1rem;border-bottom: 0.01rem solid #E5E5E5; background:#fff; }
  .shaixuan_box ul{ float:left; width:6.5rem;height:0.9rem;}
  .shaixuan_box ul li{ float:left; width:1.3rem; height:0.6rem;text-align:center; display:block;  margin-top:0.19rem; margin-left:0.2rem;
    font-size:0.26rem; background:#EDEDED; color:#BFBFBF;line-height: 0.6rem;}

  .shaixuan_box ul .current{ background:#2D5AD6; color:#fff;}
  .shaixuan_box img{ float:right; width:0.45rem;height:0.45rem;margin-top: 0.31rem; margin-right:0.33rem;}
  .time_box{ width:7.1rem; margin:0 auto; height:0.65rem; line-height:0.65rem;}
  .time_box p{ float:left; font-size:0.3rem; color:#333333;}
  .time_box h2{ float:left; font-size:0.3rem; color:#333333; padding:0rem 0.2rem;}
  /*数据*/
  .shuju_txt{ width:7.5rem; margin-top:0.3rem;}
  .shuju_txt ul li{ width:7.1rem; margin:0 auto; height:0.8rem;  line-height:0.8rem;}
  .shuju_txt ul li i{ float:left; width:0.35rem; height:0.2rem; background:#fff; display:block; margin-top:0.3rem; border-radius:100rem;}
  .shuju_txt ul li p{ float:left; color:#3A4042; font-size:0.28rem; margin-left:0.2rem;}
  .shuju_txt ul li h1{float:right; color:#131D35; font-size:0.28rem; font-weight:500;margin-right: 0.2rem}
  .shuju_txt ul li .i_01{ background:#B558F6;}
  .shuju_txt ul li .i_02{background:#F65860;}
  .shuju_txt ul li .i_03{background:#FEC400;}
  .shuju_txt ul li .i_04{background:#29CB97;}
  /*数据图*/
  .shuju_tu{ width:7.5rem;height: 5.8rem;}

  .yewu_box{width:7.1rem;padding-bottom: 0.2rem;  margin:0 auto; border-radius:0.12rem; z-index:999;  margin-top:-0.4rem;}

  .yewu_box .mingxi_tit{ width:7.1rem; margin:0 auto; height:0.8rem; line-height:0.8rem;    margin-top: 0.7rem;}
  .yewu_box .mingxi_tit h1{ font-size:0.32rem; margin-left:0.2rem;}

  .tanchuang_body {
    width: 7.5rem;
    background: #fff;
    position: relative; min-height:9rem;
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
