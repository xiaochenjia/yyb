<template>
  <div id="app" class="homeBox">
    <view class="" hover-class="none" hover-stop-propagation="false" style="width: 100%; height: 100%;z-index: 1">
      <map id="map" :longitude="longitude" :latitude="latitude" :markers="markers" scale="16" show-location style="width: 100%; height: 100%;z-index: 1"></map>
    </view>
    <van-tabs :active="active" color="#2D5AD6" @change="onChange">
      <van-tab :title="item" v-for="(item, index) in typeList" :key="index"></van-tab>
    </van-tabs>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../static/vant/toast/toast'
  var QQMapWX = require('../../static/js/qqmap/qqmap-wx-jssdk.min')
  var qqmapsdk

  export default {
    data () {
      return {
        active: 0,
        name: '',
        longitude: '',
        latitude: '',
        markers: [],
        typeList: ['教育', '医院', '地铁', '公交', '银行', '休闲', '购物', '健身', '美食']
      }
    },
    components: {
    },
    methods: {
      getLocation (val) {
        const self = this
        qqmapsdk.search({
          keyword: val,
          location: this.latitude + ',' + this.longitude,
          success: function (res) {
            self.markers = []
            let newList = []
            let local = {
              id: 0,
              iconPath: '/static/images/map-project.png',
              latitude: self.latitude,
              longitude: self.longitude,
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '24rpx',
                'content': self.name,
                'padding': '6rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '2rpx',
                'color': '#ffffff',
                'bgColor': '#2D5AD6'
              }
            }
            newList.push(local)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                let lao = {
                  id: i + 1,
                  iconPath: '/static/images/map-other.png',
                  latitude: res.data[i].location.lat,
                  longitude: res.data[i].location.lng,
                  width: 25,
                  height: 25,
                  callout: {
                    'display': 'ALWAYS',
                    'fontSize': '24rpx',
                    'content': res.data[i].title,
                    'padding': '6rpx',
                    'boxShadow': '0 0 5rpx #2D5AD6',
                    'borderRadius': '2rpx'
                  }
                }
                newList.push(lao)
              }
              self.markers = newList
            }
          },
          fail: function (res) {
            console.log('map-error:' + res)
            Toast('未获取到该类型数据')
          },
          complete: function (res) {
            console.log(res)
          }
        })
      },
      onChange (event) {
        this.active = event.mp.detail.index
        this.getLocation(this.typeList[this.active])
      }
    },
    created () {
    },
    mounted () {
      this.name = this.$root.$mp.query.name
      this.longitude = this.$root.$mp.query.longitude
      this.latitude = this.$root.$mp.query.latitude
      let lao = {
        id: 0,
        iconPath: '/static/images/map-project.png',
        latitude: this.latitude,
        longitude: this.longitude,
        width: 40,
        height: 40,
        callout: {
          'display': 'ALWAYS',
          'fontSize': '24rpx',
          'content': this.name,
          'padding': '6rpx',
          'boxShadow': '0 0 5rpx #333',
          'borderRadius': '2rpx',
          'color': '#ffffff',
          'bgColor': '#2D5AD6'
        }
      }
      this.markers.push(lao)

      this.getLocation(this.typeList[0])
    },
    onUnload () {
      this.active = 0
      this.name = ''
      this.longitude = ''
      this.latitude = ''
      this.markers = []
    },
    onLoad () {
      qqmapsdk = new QQMapWX({
        key: this.$qq_map_key
      })
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

  .homeBox {
    position: fixed;
    width: 100%;
    height: 93%;
    top: 0px;
    background-color: #ffffff;
  }
</style>
