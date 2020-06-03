<template>
  <div id="app" style="background:#ffffff;">
    <!--轮播图和搜索区域-->
    <div class="ban_sea_box">
      <!--搜索-->
      <div class="search_box">
        <div class="search_left" @click="goProjectSearchClick"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/sousuo_icon.png"/>
          <p>输入楼盘名称</p>
        </div>
        <div class="search_right" @click="goAddressClick">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/dizhi_icon.png"/>
          <p>{{areaName}}</p>
        </div>
        <div class="clr"></div>
      </div>
      <!--轮播-->
      <div class="banner_box">
        <swiper class="banner_box_swiper" autoplay="true" interval="5000" duration="500" easing-function="linear" circular="true" :current="currentSwiper" @change="swiperChange($event)" indicator-dots="true" indicator-color="rgba(255, 255, 255, .6)" indicator-active-color="#2D5AD6">
          <block v-for="(item, index) in bannerList" :index="index" :key="key">
            <swiper-item>
              <img :src="item.bannerImg" class="slide-image" mode="aspectFill" @click="goBannerClick(item)"/>
            </swiper-item>
          </block>
        </swiper>
        <!--<view class="dots">-->
          <!--<block v-for="(item, index) in bannerList" :index="index" :key="key">-->
            <!--<view :class="index === currentSwiper ? 'active' : 'dot'"></view>-->
            <!--<view :style="index === currentSwiper ? '' : 'margin-right: 0.24rem;'"></view>-->
          <!--</block>-->
        <!--</view>-->
      </div>
    </div>
    <!--分割线--勿删-->
    <div class="fengge_box"></div>
    <!--房产-->
    <div class="fang_body">
      <!--筛选行-->
      <section class="list-search-nav" data-mark="nav">
        <header class="tab_bar flexbox" data-mark="filter">
          <div class="filter flexbox flex_grow">
            <div class="tab_tit box_col post_ulog" @click="selectAreaClick"><span :class="areaTitle === '区域' ? 'tit' : 'titSelect'">{{areaTitle}}</span><i :class="areaTitle === '区域' ? 'icon_triangle_down' : 'icon_triangle_down_select'"></i></div>
            <div class="tab_tit box_col post_ulog" @click="selectStatusClick" ><span :class="statusTitle === '价格' ? 'tit' : 'titSelect'">{{statusTitle}}</span><i :class="statusTitle === '价格' ? 'icon_triangle_down' : 'icon_triangle_down_select'"></i></div>
            <div class="tab_tit box_col post_ulog" @click="selectTypeClick"><span :class="typeTitle === '筛选' ? 'tit' : 'titSelect'">{{typeTitle}}</span><i :class="typeTitle === '筛选' ? 'icon_triangle_down' : 'icon_triangle_down_select'"></i></div>
          </div>
        </header>
        <img @click="selectSortClick" class="shaixuan_right" :src="sortTitleSelected ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/qh_cutterIcon.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/qh_Icon.png'"/>
      </section>
      <!--房产-->
      <div>
        <div class="fang_border" v-for="(item, index) in projectList" :key="index" @click="goDetailClick(item)">
          <div class="fang_list">
            <div class="fang_left"> <img :src="item.mainImg" @error="errorfn(index)"/> </div>
            <div class="fang_right">
              <ul>
                <li>
                  <h1>{{item.name}}</h1>
                </li>
                <li>
                  <p>{{item.district}} | {{item.plate}}</p>
                </li>
                <li>
                  <p>面积：{{item.buildArea}}</p>
                </li>
                <li>
                  <h2>{{item.averagePrice}}<span>{{item.mainHouseType}}</span></h2>
                </li>
              </ul>
              <a class="zhuzhai">{{item.buildType}}</a> <a class="zaishou" :style="item.sellState === 'onsale' ? 'background:#19BE6B' : 'background:#bbbec4'">{{item.sellStateName}}</a>
            </div>
          <div class="clr"></div>
          <div class="fang_ld">
            <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/ld_icon.png"/><h1>楼盘亮点 |</h1><p>{{item.featureIds}}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
    <van-popup :show="showArea" @close="showArea = false" position="top" duration="500">
      <!--弹窗-->
      <div style="display: flex;flex-direction: column;">
        <div class="tanchuang_body_area" style="height:5.5rem;overflow:auto;">
          <!--按钮选择类型-->
          <div class="tanchuang01_box">
            <h1>区域</h1>
            <a :class="item.isSelected ? 'cutter' : ''" v-for="(item, index) in areaList" :key="index" @click="goSelectAreaClick(item)">{{item.areaName}}</a>
          </div>
        </div>
        <!--按钮-->
        <div class="tanchuanganniu_box"> <a class="clear" @click="goSelectAreaClearClick">清空</a><a @click="goSelectAreaSureClick">确定</a> </div>
      </div>
    </van-popup>
    <van-popup :show="showStatus" @close="showStatus = false" position="top" duration="500" custom-style="overflow:visible;">
      <!--弹窗-->
      <div class="tanchuang_body_price">
        <van-tree-select
          :items="priceList"
          :main-active-index="mainActiveIndex"
          :active-id="activeId"
          @navclick="onNavClick"
          @itemclick="onItemClick"
        />
      </div>
    </van-popup>
    <van-popup :show="showType" @close="showType = false" position="top" duration="500">
      <div style="display: flex;flex-direction: column;">
        <!--弹窗-->
        <div class="tanchuang_body" style="height:7.4rem;overflow:auto;">
          <!--按钮选择类型-->
          <div class="tanchuang01_box" v-show="siftHouseTypeList.length > 0">
            <h1>户型</h1>
            <a :class="item.isSelected ? 'cutter' : 'nocutter'" v-for="(item, index) in siftHouseTypeList" :key="index" @click="goSelectSiftHouseTypeClick(item)">{{item.houseTypeName}}</a>
          </div>
          <div class="tanchuang01_box" v-show="siftAreaList.length > 0">
            <h1>面积(㎡)</h1>
            <a :class="item.isSelected ? 'cutter' : 'nocutter'" v-for="(item, index) in siftAreaList" :key="index" @click="goSelectSiftAreaClick(item)">{{item.areaTypeName}}</a>
          </div>
          <div class="tanchuang01_box" v-show="siftStatusList.length > 0">
            <h1>售卖状态</h1>
            <a :class="item.isSelected ? 'cutter' : 'nocutter'" v-for="(item, index) in siftStatusList" :key="index" @click="goSelectSiftStatusClick(item)">{{item.typename}}</a>
          </div>
        </div>
        <div class="tanchuanganniu_box"> <a class="clear" @click="goSelectTypeClearClick">清空</a><a  @click="goSelectTypeSureClick">确定</a> </div>
      </div>
    </van-popup>
    <van-popup :show="showSort" @close="showSort = false" position="top" duration="500">
      <!--弹窗-->
      <div class="tanchuang_body" style="min-height:4.5rem;">
        <div class="tanchuang02_box">
          <ul>
            <li v-for="(item, index) in sortList" :key="index" @click="goSelectSortClick(item)">
              <p :class="item.isSelected ? 'cutter' : ''">{{item.typename}}</p>
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
    <div v-show="noData" class="font_box">
      <p>未查询到楼盘数据</p>
    </div>
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
        userInfo: {},
        showArea: false,
        showStatus: false,
        showType: false,
        showSort: false,
        bannerList: [],
        currentSwiper: 0,
        autoplay: true,
        areaTitle: '区域',
        statusTitle: '价格',
        typeTitle: '筛选',
        sortTitleSelected: false,
        areaCode: '-1',
        areaCodeTemp: '-1',
        areaName: '未知',
        projectList: [],
        condition: {},
        areaList: [],
        areaListSearch: [],
        priceList: [],
        priceListSearch: '',
        priceListSearchType: '',
        siftHouseTypeList: [],
        siftHouseTypeListSearch: [],
        siftAreaList: [],
        siftAreaListSearch: [],
        siftStatusList: [],
        siftStatusListSearch: [],
        sortList: [],
        sortListSearch: '',
        mainActiveIndex: 0,
        activeId: 0,
        noReadNum: 0,
        noData: false
      }
    },
    components: {
    },
    async onPullDownRefresh () {
      // 下拉刷新
      this.initBannerList()
      this.initProjectList()
      wx.stopPullDownRefresh()
    },
    methods: {
      errorfn (index) {
        this.projectList[index].mainImg = ''
      },
      swiperChange (res) {
        this.currentSwiper = res.mp.detail.current
      },
      goDetailClick (item) {
        const path = '/pages/projectDetail'
        const query = {
          'projectId': item.id
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goBannerClick (item) {
        if (item.isDrill) {
          // 外部URL
          if (item.drillType === 'url') {
            const path = '/pages/webview'
            const query = {
              'url': item.drillValue
            }
            this.$router.push({ path, query, reLaunch: false })
          } else if (item.drillType === 'msg') {
            const path = '/pages/messageDetail'
            const query = {
            }
            this.$router.push({ path, query, reLaunch: false })
          } else if (item.drillType === 'project') {
            const path = '/pages/projectDetail'
            const query = {
              'projectId': item.drillValue
            }
            this.$router.push({ path, query, reLaunch: false })
          }
        }
      },
      goProjectSearchClick () {
        const path = '/pages/projectList'
        const query = {
          'type': 'search'
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goAddressClick () {
        const path = '/pages/address'
        const query = {
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      selectAreaClick () {
        this.showArea = true
      },
      selectStatusClick () {
        this.showStatus = true
      },
      selectTypeClick () {
        this.showType = true
      },
      selectSortClick () {
        this.showSort = true
      },
      initLogin () {
        const self = this
        wx.login({
          success (res) {
            if (res.code) {
              self.code = res.code
              // 获取用户注册状态
              self.$iBox.http('Api.wxCode2SessionApi', {
                'code': self.code
              })({}).then(res => {
                // 0:未注册 1:已注册
                self.$store.token = res.data.token
                if (res.data.status === '1') {
                  self.$iBox.http('Api.getUserInfoApi')({}).then(respUserInfo => {
                    self.userInfo.nickName = respUserInfo.data.nickName
                    self.userInfo.avatarUrl = respUserInfo.data.headImg
                    self.userInfo.phone = respUserInfo.data.phone
                    self.userInfo.realName = respUserInfo.data.realName
                    self.userInfo.idCard = respUserInfo.data.idCard
                    self.userInfo.roleType = respUserInfo.data.roleType
                    self.userInfo.companyName = respUserInfo.data.companyName
                    self.userInfo.storeName = respUserInfo.data.storeName
                    self.userInfo.companyId = respUserInfo.data.companyId
                    self.userInfo.storeId = respUserInfo.data.storeId
                    // 1:注册-未绑定 2:绑定门店申请中(绑定待审核) 3:绑定成功(在职) 4:离职
                    self.userInfo.status = respUserInfo.data.status
                    self.$store.isLogin = true
                    self.$store.userInfo = self.userInfo
                    self.initMessage()
                  }).catch(e => {
                    console.log(e)
                  })
                } else {
                  console.log('用户未注册')
                }
              }).catch(e => {
                console.log(e)
              })
            }
          }
        })
      },
      getLocation () {
        let that = this
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation'] !== undefined && res.authSetting['scope.userLocation'] !== true) { // 非初始化进入该页面,且未授权
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
                success: function (res) {
                  if (res.cancel) {
                    Toast('地理位置授权失败')
                  } else if (res.confirm) {
                    wx.openSetting({
                      success: function (dataAu) {
                        if (dataAu.authSetting['scope.userLocation'] === true) {
                          Toast('地理位置授权成功')
                          // 再次授权，调用getLocationt的API
                          that.getInitLocation()
                        } else {
                          Toast('地理位置授权失败')
                        }
                      }
                    })
                  }
                }
              })
            } else if (res.authSetting['scope.userLocation'] === undefined) { // 初始化进入
              that.getInitLocation()
            } else { // 授权后默认加载
              that.getInitLocation()
            }
          }
        })
      },
      getInitLocation () {
        let vm = this
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            // console.log(JSON.stringify(res))
            let latitude = res.latitude
            let longitude = res.longitude
            vm.getLocal(latitude, longitude)
          },
          fail: function (res) {
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
            vm.areaName = res.result.ad_info.city.replace('市', '')
            vm.iniCity()
          },
          fail: function (res) {
            vm.areaName = '未知'
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          }
        })
      },
      goSelectAreaClick (item) {
        item.isSelected = !item.isSelected
      },
      goSelectSiftHouseTypeClick (item) {
        item.isSelected = !item.isSelected
      },
      goSelectSiftAreaClick (item) {
        item.isSelected = !item.isSelected
      },
      goSelectSiftStatusClick (item) {
        item.isSelected = !item.isSelected
      },
      goSelectSortClick (item) {
        for (let i = 0; i < this.sortList.length; i++) {
          if (this.sortList[i].typecode !== item.typecode) {
            this.sortList[i].isSelected = false
          }
        }
        this.sortListSearch = ''
        item.isSelected = !item.isSelected
        if (!item.isSelected) {
          this.sortTitleSelected = false
        } else {
          this.sortTitleSelected = true

          this.sortListSearch = item.typecode
        }
        this.showSort = false

        this.initProjectList()
      },
      goSelectAreaSureClick () {
        let num = 0
        this.areaListSearch = []
        for (let i = 0; i < this.areaList.length; i++) {
          if (this.areaList[i].isSelected) {
            num = num + 1
            this.areaListSearch.push(this.areaList[i].areaId)
          }
        }
        if (num > 0) {
          this.areaTitle = '区域(' + num + ')'
          this.showArea = false
        } else {
          this.areaTitle = '区域'
          this.showArea = false
        }

        this.initProjectList()
      },
      goSelectAreaClearClick () {
        for (let i = 0; i < this.areaList.length; i++) {
          this.areaList[i].isSelected = false
        }
      },
      goSelectTypeSureClick () {
        let num = 0
        this.siftHouseTypeListSearch = []
        this.siftAreaListSearch = []
        this.siftStatusListSearch = []
        for (let i = 0; i < this.siftHouseTypeList.length; i++) {
          if (this.siftHouseTypeList[i].isSelected) {
            num = num + 1
            this.siftHouseTypeListSearch.push(this.siftHouseTypeList[i].houseTypeId)
          }
        }
        for (let i = 0; i < this.siftAreaList.length; i++) {
          if (this.siftAreaList[i].isSelected) {
            num = num + 1
            this.siftAreaListSearch.push(this.siftAreaList[i].areaTypeId)
          }
        }
        for (let i = 0; i < this.siftStatusList.length; i++) {
          if (this.siftStatusList[i].isSelected) {
            num = num + 1
            this.siftStatusListSearch.push(this.siftStatusList[i].typecode)
          }
        }
        if (num > 0) {
          this.typeTitle = '筛选(' + num + ')'
          this.showType = false
        } else {
          this.typeTitle = '筛选'
          this.showType = false
        }

        this.initProjectList()
      },
      goSelectTypeClearClick () {
        for (let i = 0; i < this.siftHouseTypeList.length; i++) {
          this.siftHouseTypeList[i].isSelected = false
        }
        for (let i = 0; i < this.siftAreaList.length; i++) {
          this.siftAreaList[i].isSelected = false
        }
        for (let i = 0; i < this.siftStatusList.length; i++) {
          this.siftStatusList[i].isSelected = false
        }
      },
      onNavClick (event) {
        this.mainActiveIndex = event.mp.detail.index
      },
      onItemClick (event) {
        this.activeId = event.mp.detail.id
        // this.statusTitle = event.mp.detail.text
        this.showStatus = false
        this.priceListSearch = ''
        this.priceListSearchType = ''
        if (event.mp.detail.id === '-1') {
          this.statusTitle = '价格'
        } else {
          this.statusTitle = '价格(1)'

          if (event.mp.detail.type === 'jj') {
            this.priceListSearchType = 'jj'
            this.priceListSearch = event.mp.detail.id
          } else if (event.mp.detail.type === 'zj') {
            this.priceListSearchType = 'zj'
            this.priceListSearch = event.mp.detail.id
          }
        }
        this.initProjectList()
      },
      iniCity () {
        this.$iBox.http('Api.getCityByCodeApi', {
          'cityCode': this.areaCodeTemp
        })({}).then((res) => {
          this.$store.areaCode = res.data.cityId
          this.$store.areaName = res.data.cityName
          this.initProjectSearchCondition()
        })
      },
      initProjectSearchCondition () {
        // 重置
        this.typeTitle = '筛选'
        this.statusTitle = '价格'
        this.areaTitle = '区域'
        this.sortTitleSelected = false

        this.areaListSearch = []
        this.siftAreaListSearch = []
        this.siftHouseTypeListSearch = []
        this.priceListSearchType = ''
        this.sortListSearch = ''

        this.$iBox.http('Api.projectConditionListApi')({}).then(res => {
          // 区域
          for (let i = 0; i < res.data.districtList.length; i++) {
            res.data.districtList[i].isSelected = false
          }
          this.areaList = res.data.districtList

          this.priceList = []
          // 均价
          let jjList = []
          for (let i = 0; i < res.data.jjList.length; i++) {
            let obj = {'id': res.data.jjList[i].priceTypeId, 'text': res.data.jjList[i].priceTypeName, 'type': 'jj'}
            jjList.push(obj)
          }
          let jjObj = {
            'text': '均价',
            'children': jjList
          }

          // 总价
          let zjList = []
          for (let i = 0; i < res.data.zjList.length; i++) {
            let obj = {'id': res.data.zjList[i].priceTypeId, 'text': res.data.zjList[i].priceTypeName, 'type': 'zj'}
            zjList.push(obj)
          }
          let zjObj = {
            'text': '总价',
            'children': zjList
          }
          this.priceList.push(jjObj)
          this.priceList.push(zjObj)

          // 户型
          for (let i = 0; i < res.data.houseTypeList.length; i++) {
            res.data.houseTypeList[i].isSelected = false
          }
          this.siftHouseTypeList = res.data.houseTypeList
          // 区域
          for (let i = 0; i < res.data.areaList.length; i++) {
            res.data.areaList[i].isSelected = false
          }
          this.siftAreaList = res.data.areaList
          // 状态
          for (let i = 0; i < res.data.sellStateList.length; i++) {
            res.data.sellStateList[i].isSelected = false
          }
          this.siftStatusList = res.data.sellStateList
          // 排序
          for (let i = 0; i < res.data.sortList.length; i++) {
            res.data.sortList[i].isSelected = false
          }
          this.sortList = res.data.sortList
        })
        this.initProjectList()
      },
      initProjectList () {
        // 根据条件
        let value = {}
        if (this.areaListSearch.length > 0) {
          this.$set(value, 'district', this.areaListSearch)
        }

        if (this.siftAreaListSearch.length > 0) {
          this.$set(value, 'area', this.siftAreaListSearch)
        }

        if (this.siftHouseTypeListSearch.length > 0) {
          this.$set(value, 'houseType', this.siftHouseTypeListSearch)
        }

        if (this.siftStatusListSearch.length > 0) {
          this.$set(value, 'sellState', this.siftStatusListSearch)
        }

        if (this.priceListSearchType.length > 0) {
          if (this.priceListSearchType === 'jj') {
            this.$set(value, 'jj', this.priceListSearch)
          } else if (this.priceListSearchType === 'zj') {
            this.$set(value, 'zj', this.priceListSearch)
          }
        }

        if (this.sortListSearch.length > 0) {
          this.$set(value, 'sort', this.sortListSearch)
        }

        this.$iBox.http('Api.projectListApi', {
          'type': 'condition',
          'value': JSON.stringify(value)
        }, true)({}).then((res) => {
          this.projectList = res.data.list
          if (this.projectList.length > 0) {
            this.noData = false
          } else {
            this.noData = true
          }
          setTimeout(() => {
            Toast('共为您找到' + this.projectList.length + '个楼盘')
          }, 400)
        })
      },
      initBannerList () {
        this.$iBox.http('Api.homeBannerListApi')({}).then((res) => {
          this.bannerList = res.data.list
        })
      },
      initMessage () {
        // this.$iBox.http('Api.messageNoReadNumApi')({}).then((res) => {
        //   this.noReadNum = res.data.num
        //   if (parseInt(this.noReadNum) > 0) {
        //     wx.setTabBarBadge({
        //       index: 3,
        //       text: this.noReadNum
        //     })
        //   } else {
        //     wx.removeTabBarBadge({
        //       index: 3
        //     })
        //   }
        // })
      }
    },
    created () {
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    mounted () {
      this.initBannerList()
    },
    onLoad () {
      this.initLogin()
      console.log('初始化.....')
      qqmapsdk = new QQMapWX({
        key: this.$qq_map_key
      })
    },
    onShow () {
      if (this.$store.areaCode !== undefined) {
        if (this.$store.areaName !== this.areaName) {
          this.projectList = []
          this.initProjectSearchCondition()
        }
        this.areaName = this.$store.areaName
      } else {
        this.getLocation()
      }

      if (this.$store.isLogin) {
        this.initMessage()
      } else {
        wx.removeTabBarBadge({
          index: 3
        })
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
  .ban_sea_box{ background:url(http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/banner_bg.png) no-repeat 100% 100%;background-size:7.5rem 4.76rem;width: 7.5rem;height: 4.76rem; overflow:hidden;}
  .search_box{ width:7.1rem; height:0.9rem; background:rgba(255, 255, 255, 0.8); margin:0 auto; border-radius:0.12rem; margin-top:0.3rem;}
  .search_left{ float:left; width:5.3rem;}
  .search_left img{ width:0.28rem;height: 0.28rem; display:block; float:left; margin-top:0.31rem; margin-left:0.2rem;}
  .search_left input{ width:4.6rem; display:block; float:left;
    outline: none;height: 0.5rem;line-height: 0.5rem;border: none;background: none;
    margin-left: 0.1rem; margin-top:0.2rem; font-size:0.3rem;border-right: 0.01rem solid #CECECE;}
  .search_left p{ width:4.6rem; display:block; float:left; color:#7b7b7b;
    outline: none;height: 0.5rem;line-height: 0.5rem;border: none;background: none;
    margin-left: 0.1rem; margin-top:0.2rem; font-size:0.3rem;border-right: 0.01rem solid #CECECE;}
  .search_right{ float:left; width:1.76rem;}
  .search_right img{ width:0.32rem;height: 0.38rem; display:block; float:left; margin-top:0.27rem; margin-left:0.2rem;}
  .search_right p{display:block; float:left;font-size:0.3rem; color:#131D35;
    font-weight:bold; line-height:0.9rem; margin-left:0.15rem;
    width: 1.0rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}

  .banner_box{ width:7.1rem; height:3rem; margin:0 auto; border-radius:0.18rem; margin-top:0.28rem;position: relative;  }
  .banner_box_swiper{width:7.1rem;height: 3rem}
  .banner_box img{ width:100%; height:3rem;border-radius:0.18rem;}
  /*筛选*/
  .list-search-nav{ border-bottom:0.01rem solid #E5E5E5;}
  .tab_bar {height:0.88rem;line-height: 0.88rem;background-color: #fff;border-bottom: none;width: 6.4rem; float:left;}
  .shaixuan_right{ float:left; width:0.3rem;height: 0.36rem;margin-top: 0.3rem;margin-left: 0.3rem;}
  .flexbox {display: flex;}
  .flex_grow {-webkit-flex-grow: 1;flex-grow: 1;}
  .tab_bar .tab_tit {position: relative;text-align: center;font-size: .28rem;overflow: hidden;}
  .flexbox .box_col {display: block;-webkit-box-flex: 1;-webkit-flex: 1;-moz-box-flex: 1;-ms-flex: 1;flex: 1;}
  .tab_bar .tab_tit>.tit {padding-right: 0.1rem;display: inline-block;vertical-align: middle;overflow: hidden;color: #3A4042;}
  .tab_bar .tab_tit>.titSelect {padding-right: 0.1rem;display: inline-block;vertical-align: middle;overflow: hidden;color: #2D5AD6;}
  .icon_triangle_down {width: 0.2rem;height: 0.18rem;display: inline-block;background-image:url(http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/jiantou_down.png);
    background-repeat: no-repeat;background-size: 100%;}
  .icon_triangle_down_select {width: 0.2rem;height: 0.18rem;display: inline-block;background-image:url(http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/jiantou_up.png);
    background-repeat: no-repeat;background-size: 100%;}
  /*房产区域*/
  .fang_box{ width:6.7rem;margin:0 auto;}
  .fang_border {width:6.7rem;border-bottom:0.01rem solid #E5E5E5; margin:0 auto; }
  .fang_border:last-child{border-bottom:none;}
  .fang_list{ width:6.7rem; padding-bottom:0.2rem; border-bottom:0.01rem solid #E5E5E5; margin:0 auto;}
  .fang_list:last-child{border-bottom:none;}
  .fang_list .fang_left{ float:left; width:2.1rem; height:1.6rem; margin-top:0.3rem;}
  .fang_list .fang_left img{ width:2.1rem; height:1.6rem; }
  .fang_list .fang_right{ float:left; width:2.1rem; height:1.6rem; margin-top:0.3rem; width:4.2rem; margin-left:0.3rem; position:relative;}
  .fang_list .fang_right h1{font-size:0.32rem; font-weight:500;color:rgba(19,29,53,1);line-height:0.44rem; }
  .fang_list .fang_right p{font-size:0.24rem; font-weight:400;color:rgba(156,158,160,1);line-height:0.34rem;margin-top:0.04rem;}
  .fang_list .fang_right h2{font-size:0.3rem; font-weight:500;color:#ED3F14;line-height:0.42rem;margin-top:0.08rem;
    width: 4.26rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
  .fang_list .fang_right h2 span{font-size:0.24rem; font-weight:400;color:rgba(156,158,160,1);line-height:0.34rem; margin-left:0.15rem;}
  .fang_list .fang_right .zaishou{width:0.65rem;height:0.36rem;background:#19BE6B;border-radius:0.04rem; font-size:0.2rem;
    font-weight:500;color:rgba(255,255,255,1); text-align:center; line-height:0.38rem; display:block; position:absolute;right:-0.12rem; top:0.04rem;}
  .fang_list .fang_right .zhuzhai{width:0.65rem;height:0.34rem;border-radius:0.04rem; font-size:0.2rem;
    font-weight:500;color:#495060; text-align:center; line-height:0.36rem; display:block; position:absolute;right:0.65rem; top:0.04rem;border: 0.01rem solid #495060}
  .fang_list .fang_ld{width:6.7rem; height:0.7rem; background:rgb(254,251,245,1); margin:0 auto;    margin-top: 0.2rem; border-radius:0rem;}
  .fang_list .fang_ld img{ width:0.3rem; height:0.3rem; float:left; margin-left:0.2rem; margin-top:0.2rem;}

  .fang_list .fang_ld h1{ font-size:0.26rem;float:left; line-height:0.7rem;margin-left:0.06rem; color:#fb5336;}
  .fang_list .fang_ld p{ font-size:0.24rem;float:left;line-height:0.7rem;margin-left:0.1rem; color:#1b2438;
    width: 4.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
  /*弹窗筛选*/
  .tanchuang_body {
    width: 7.5rem;
    background: #fff;
    position: relative;
    min-height:5.4rem;
  }
  .tanchuang_body_price {
    width: 7.5rem;
    background: #fff;
    position: relative;
    max-height:5.4rem;
  }
  .tanchuang_body_area {
    width: 7.5rem;
    background: #fff;
    position: relative;
    min-height:4.6rem;
  }
  .tanchuang01_box {
    width: 7.5rem;
    padding: 0.25rem 0rem;
  }
  .tanchuang01_box h1{font-size: 0.32rem;display: block;color: #333; display:block;margin-left:0.3rem;font-weight: 600}
  .tanchuang01_box a {
    float: left;
    width: 1.5rem;
    height: 0.6rem;
    background: rgb(243,244,246);
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.28rem;
    display: block;
    color: rgb(27,35,50);
    border-radius: 0.06rem;
  }
  .tanchuang01_box .cutter {
    background: #4270ED;
    color: #fff;
    font-size: 0.24rem;
  }
  .tanchuang01_box .nocutter {
    background: rgb(243,244,246);
    color: rgb(27,35,50);
    font-size: 0.24rem;
  }
  .tanchuang02_box {
    width: 7.5rem;
    padding: 0.3rem 0rem;
  }
  .tanchuang02_box ul li {
    height: 1.0rem;
    line-height: 1.0rem;
  }
  .tanchuang02_box ul li p {
    margin-left: 0.3rem;
    line-height: 0.8rem;
    font-size: 0.34rem;
    display: block;
    color: rgb(27,35,50);
    border-radius: 0.04rem;
  }
  .tanchuang02_box ul li .cutter {
    color: #2D5AD6;
  }
  .tanchuanganniu_box {
    width: 7.5rem;
    height: 1.4rem;
    background: #fff;
    bottom: 0rem;
    left: 0rem;
    border-top:0.01rem solid #e9eaec;
  }
  .tanchuanganniu_box a {
    width: 3.3rem;
    margin: 0 auto;
    margin-top: 0.25rem;
    float: left;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background: #4270ED;
    border-radius: 0.12rem;
    color: #fff;
    text-align: center;
    font-size: 0.3rem;
    display: block;
    margin-left: 0.3rem;
  }
  .tanchuanganniu_box .clear{
    width: 3.3rem;
    margin: 0 auto;
    margin-top: 0.25rem;
    float: left;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background: rgb(248,248,250);
    border-radius: 0.12rem;
    color: #495060;
    text-align: center;
    font-size: 0.3rem;
    display: block;
    margin-left: 0.3rem;
  }

  /*用来包裹所有的小圆点  */
  .dots{
    width: 1.1rem;
    height: 0.26rem;
    display: flex;
    flex-direction: row;
    position: relative;
    bottom: 0.3rem;
    margin:0 auto;
  }
  /*未选中时的小圆点样式 */
  .dot{
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    /*margin-right: 0.12rem;*/
    background-color: rgba(254,254,254,0.7);
  }
  /*选中以后的小圆点样式  */
  .active{
    width: 0.3rem;
    height: 0.12rem;
    display: block;
    border-radius: 100rem;
    margin-right: 0.12rem;
    background-color: white;
  }

</style>
