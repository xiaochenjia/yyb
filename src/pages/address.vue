<template>
  <div id="app">
    <div class="city_box">
      <h1>我的定位</h1>
      <div class="city_list">
        <p @click="selectLocationClick">{{city}}<span>GPS定位</span></p>
        <a @click="goResetClick" v-show="!isReset">重新定位</a>
        <div v-show="isReset">
          <van-loading color="#2D5AD6" />
        </div>
      </div>
    </div>
    <div class="kaitong_box">
      <h1>已开通城市</h1>
      <ul>
        <li @click="selectCityClick(item)" v-for="(item, index) in areaList" :key="index">
          <a>{{item.cityName}}</a>
        </li>
      </ul>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  var QQMapWX = require('../../static/js/qqmap/qqmap-wx-jssdk.min')
  var qqmapsdk

  export default {
    data () {
      return {
        areaList: [],
        city: '-',
        isReset: false,
        areaCodeTemp: ''
      }
    },
    components: {
    },
    methods: {
      selectLocationClick () {
        this.iniCity()
      },
      selectCityClick (item) {
        this.$store.areaCode = item.cityId
        this.$store.areaName = item.cityName
        this.$router.back()
      },
      getLocation () {
        let vm = this
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            vm.isReset = false
            // console.log(JSON.stringify(res))
            let latitude = res.latitude
            let longitude = res.longitude
            vm.getLocal(latitude, longitude)
          },
          fail: function (res) {
            vm.city = '无法定位到当前位置'
            vm.isReset = false
            console.log('fail' + JSON.stringify(res))
          }
        })
      },
      getLocal (latitude, longitude) {
        let vm = this
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            // console.log(JSON.stringify(res))
            if (res.result.ad_info.adcode.length > 4) {
              vm.areaCodeTemp = res.result.ad_info.adcode.substr(0, 4) + '00'
            }
            // adcode 编码
            vm.city = res.result.ad_info.city.replace('市', '')
          },
          fail: function (res) {
            vm.city = '无法定位到当前位置'
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          }
        })
      },
      iniCity () {
        this.$iBox.http('Api.getCityByCodeApi', {
          'cityCode': this.areaCodeTemp
        })({}).then((res) => {
          this.$store.areaCode = res.data.cityId
          this.$store.areaName = res.data.cityName
          this.$router.back()
        })
      },
      goResetClick () {
        this.isReset = true
        this.city = '-'
        setTimeout(() => {
          this.getLocation()
        }, 1000)
      }
    },
    created () {
    },
    mounted () {
      this.$iBox.http('Api.homeCityListApi')({}).then(res => {
        this.areaList = res.data.list
      })
    },
    onLoad () {
      qqmapsdk = new QQMapWX({
        key: this.$qq_map_key
      })
      this.getLocation()
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
  .city_box { width:7.5rem; background:#fff; overflow:hidden;    height: 2.5rem;}
  .city_box h1{font-size: 0.5rem;
    color: #333;
    font-weight: 500;
    margin-top: 0.5rem;
    margin-left: 0.3rem;}
  .city_list{ width:7.5rem; height:1rem; line-height:1rem; margin-top:0.2rem;}
  .city_list p{ float:left;font-size: 0.32rem;color: #333; margin-left:0.3rem;}
  .city_list p span{ font-size:0.26rem; color:#999; margin-left:0.1rem;}
  .city_list a{ float:left; float:right;font-size: 0.28rem;color: #2D5AD6; margin-right:0.3rem;}
  .city_list div{ float:left; float:right;font-size: 0.28rem;color: #2D5AD6; margin-right:0.3rem;}

  .kaitong_box{width:7.5rem; }
  .kaitong_box h1{ font-size:0.3rem; color: #333;font-weight: 500; margin-top: 0.3rem;margin-left: 0.3rem;}
  .kaitong_box ul li{ float:left; width:2.1rem; height:0.8rem; background:#fff; margin-left:0.3rem; margin-top:0.3rem;}
  .kaitong_box ul li a{ text-align:center; line-height:0.8rem; background:#fff; font-size:0.28rem;width:2.1rem; height:0.8rem; display:block;}

</style>
