<template>
  <div id="app" style=" background:#F8F8F8;">
    <div v-show="isShow">
      <!--楼盘图片-->
      <div class="loupantu_body">
        <div class="loupantu_box">
          <div class="loupantu_tit">
            <h1>{{projectDetail.projectName}}</h1>
            <a class="loupan_tit_A">{{projectDetail.statusName}}</a><a class="loupan_tit_B">{{projectDetail.projectBuildType}}</a> </div>
          <div class="bieming">
            <h2>{{projectDetail.projectAliasName}}</h2>
          </div>
          <div class="zhanshitu_loupan" @click="goPhotoClick()">
            <div class="zhanshitu_left"> <img :src="imgOne" @error="errorfn(imgOne)"/> </div>
            <div class="zhanshitu_right"> <img :src="imgTwo" @error="errorfn(imgTwo)"/>
              <div class="zhanshitu_more" :style="'background-image: url(' + imgThree + ')'">
                <p>{{'+' + projectDetail.projectImgNum}}<br/>查看更多</p>
              </div>
            </div>
          </div>
          <div class="jiage_box">
            <ul>
              <li>
                <p >均价</p>
                <h1>{{projectDetail.unitPrice}}</h1>
              </li>
              <li>
                <p>建筑面积</p>
                <h1>{{projectDetail.projectBuildArea}}</h1>
              </li>
              <li style="border-right:none;">
                <p>建筑类型</p>
                <h1>{{projectDetail.projectBuildType}}</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--楼盘信息-->
      <div class="loupaninfo_body">
        <div class="loupaninfo_box">
          <div class="loupaninfo_tit">
            <h1>楼盘信息</h1>
          </div>
          <ul>
            <li v-for="(detail, index) in projectDetail.projectDetails" :key="index" v-show="index < 4 ? true : infoShow">
              <p>{{detail.name}}</p>
              <b>{{detail.value}}</b>
            </li>
          </ul>
          <div @click="onInfoShowClick" class="ssuo" v-show="projectDetail.projectDetails === undefined ? false : projectDetail.projectDetails.length < 5 ? false : true"><img :src="infoShow ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_top01.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_top02.png'"/></div>
        </div>
      </div>

      <!--户型介绍-->
      <div class="huxing_body" v-show="projectDetail !== undefined && projectDetail.housingTypeList !== undefined && projectDetail.housingTypeList.length > 0">
        <div class="huxing_box">
          <div class="lhuxing_tit">
            <h1>户型介绍</h1>
            <h2 @click="goHouseTypeClick">查看全部</h2>
          </div>
          <ul v-if="projectDetail.housingTypeList === undefined ? false : projectDetail.housingTypeList.length > 1 ? true : false">
            <li>
              <swiper class="banner_box_swiper" next-margin="20px" interval="5000" easing-function="linear" display-multiple-items="2">
                <block>
                  <div v-for="(item, index) in projectDetail.housingTypeList" :key="index">
                    <swiper-item>
                      <div class="hx01"> <img :src="item.housingTypeImg" @click="getImage(item.housingTypeImg)"/></div>
                      <div class="hx02">
                        <h1>{{item.housingTypeName}}</h1>
                        <p>{{item.housingTypeArea}}</p>
                      </div>
                      <div class="hx03" v-if="item.housingTypeTrait !== undefined && item.housingTypeTrait.length > 0">
                        <a v-for="(tag, idx) in item.housingTypeTrait" :key="idx">{{tag}}</a>
                      </div>
                    </swiper-item>
                  </div>
                </block>
              </swiper>
            </li>
          </ul>
          <ul v-else class="ulv">
            <li>
              <div v-for="(item, index) in projectDetail.housingTypeList" :key="index">
                <div class="hx01"> <img :src="item.housingTypeImg" @click="getImage(item.housingTypeImg)"/></div>
                <div class="hx02">
                  <h1>{{item.housingTypeName}}</h1>
                  <p>{{item.housingTypeArea}}</p>
                </div>
                <div class="hx03" v-if="item.housingTypeTrait !== undefined && item.housingTypeTrait.length > 0">
                  <a v-for="(tag, idx) in item.housingTypeTrait" :key="idx">{{tag}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--楼盘动态-->
      <div class="loupandongtai_body" v-if="projectDetail.dynamic !== undefined && projectDetail.dynamic.list !== undefined && projectDetail.dynamic.list.length > 0">
        <div class="loupandongtai_box">
          <div class="loupandongtai_tit">
            <h1>楼盘动态（{{projectDetail.dynamic.dynamicNum}}）</h1>
            <h2 @click="goDynamicClick">查看全部</h2>
          </div>
          <div class="loupandongtai_list" v-for="(item, index) in projectDetail.dynamic.list" :key="index" @click="toDynamicDetail(item)">
            <h1>{{item.dynamicName}}</h1>
            <p>{{item.dynamicDesc}}</p>
            <b>{{item.dynamicDate}}</b>
          </div>
        </div>
      </div>
      <!--周边配套-->
      <div class="zhoubianpeitao_body" v-show="projectDetail !== undefined && projectDetail.matchingList !== undefined && projectDetail.matchingList.length > 0">
        <div class="zhoubianpeitao_box">
          <div class="zhoubianpeitao_tit">
            <h1>周边配套</h1>
          </div>
          <ul>
            <li v-for="(match, index) in projectDetail.matchingList" :key="index" v-show="index < 4 ? true : dynamicShow">
              <p>{{match.matchingName}}</p>
              <b>{{match.matchingDesc}}</b>
            </li>
          </ul>
          <div @click="onDynamicShow" class="ssuo" v-show="projectDetail.matchingList === undefined ? false : projectDetail.matchingList.length < 5 ? false : true"><img :src="dynamicShow ? 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_top01.png' : 'http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_top02.png'"/></div>
        </div>
      </div>

      <!--位置周边-->
      <div class="weizhizhoubian_body">
        <div class="weizhizhoubian_box">
          <div class="weizhizhoubian_tit">
            <h1>位置周边</h1>
          </div>
          <!--地图-->
          <div class="zb_map">
            <img :src="mapUrl" @click="goLocationClick">
          </div>
        </div>
      </div>
      <!--按钮-->
      <div style="height:1.5rem;"></div>
      <div class="btn"><a style=" background:#66C18F;" @click="goTelClick">立即致电</a><a style="background:#4270ED" @click="goReportClick">在线推荐</a></div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
  import Dialog from '../../static/vant/dialog/dialog'
  import Toast from '../../static/vant/toast/toast'
  var amapFile = require('../../static/js/map/amap-wx')

  export default {
    data () {
      return {
        mapUrl: '',
        infoShow: false,
        dynamicShow: false,
        projectId: '',
        projectDetail: {},
        imgOne: '',
        imgTwo: '',
        imgThree: '',
        isShow: false
      }
    },
    components: {
    },
    methods: {
      errorfn (img) {
        img = ''
      },
      getImage (url) {
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: [url] // 需要预览的图片http链接列表
        })
      },
      initMap (item) {
        let that = this
        let myAmapFun = new amapFile.AMapWX({key: this.$gaode_map_key})
        wx.getSystemInfo({
          success: function (data) {
            let height = 135
            let width = 300
            let size = width + '*' + height
            myAmapFun.getStaticmap({
              zoom: 10,
              size: size,
              scale: 2,
              location: item.projectAddressLongitude + ',' + item.projectAddressLatitude,
              markers: '-1,http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/map-project.png,0:' + item.projectAddressLongitude + ',' + item.projectAddressLatitude, // 'mid,0x2D5AD6,:118.779894,31.825553',
              labels: item.projectName + ',2,0,26,0xFFFFFF,0x2D5AD6:' + item.projectAddressLongitude + ',' + item.projectAddressLatitude,
              success: function (data) {
                that.mapUrl = data.url
                console.log(data.url)
              },
              fail: function (info) {
                console.log(info.errMsg)
              }
            })
          }
        })
      },
      onInfoShowClick () {
        this.infoShow = !this.infoShow
      },
      onDynamicShow () {
        this.dynamicShow = !this.dynamicShow
      },
      goTelClick () {
        wx.makePhoneCall({
          phoneNumber: this.projectDetail.projectTel
        })
      },
      toDynamicDetail (item) {
        const path = '/pages/projectDynamicDetail'
        const query = {
          'dynamicId': item.dynamicId,
          'messageName': item.dynamicName
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goReportClick () {
        if (!this.$store.isLogin) {
          const path = '/pages/mine'
          const query = {
          }
          this.$router.push({ path, query, reLaunch: true })
          return
        }

        let status = this.$store.userInfo.status
        if (status === '0') {
          Dialog.confirm({
            title: '提示',
            message: '您还未设置所属渠道，是否现在去设置？'
          }).then(() => {
            const path = '/pages/userCheck'
            const query = {
            }
            this.$router.push({ path, query, reLaunch: false })
          }).catch(() => {
            // on cancel
          })
        } else if (status === '1') {
          Toast('您的所属渠道申请正在审核中，无法进行操作')
        } else if (status === '2') {
          this.$iBox.http('Api.projectListForCustomerApi', {
            'type': 'id',
            'value': this.projectDetail.projectId
          }, true)({}).then(() => {
            const path = '/pages/reportResult'
            const query = {
              'projectId': this.projectDetail.projectId
            }
            this.$router.push({ path, query, reLaunch: false })
          })
        }
      },
      goPhotoClick () {
        const path = '/pages/projectPhoto'
        const query = {
          'projectId': this.projectDetail.projectId
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goHouseTypeClick () {
        const path = '/pages/projectHouseType'
        const query = {
          'projectId': this.projectDetail.projectId
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goDynamicClick () {
        const path = '/pages/projectDynamic'
        const query = {
          'projectId': this.projectDetail.projectId
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      goLocationClick () {
        const path = '/pages/projectLocation'
        const query = {
          'name': this.projectDetail.projectName,
          'longitude': this.projectDetail.projectAddressLongitude,
          'latitude': this.projectDetail.projectAddressLatitude
        }
        this.$router.push({ path, query, reLaunch: false })
      },
      initDetailData () {
        this.$iBox.http('Api.projectDetailApi', {
          'projectId': this.projectId
        }, true)({}).then((res) => {
          this.projectDetail = res.data
          if (this.projectDetail.projectName.length > 0) {
            this.isShow = true
          }
          if (this.projectDetail.projectImgList.length > 0) {
            this.imgOne = this.projectDetail.projectImgList[0]
            if (this.projectDetail.projectImgList.length >= 1) {
              this.imgTwo = this.projectDetail.projectImgList[1]
            }
            if (this.projectDetail.projectImgList.length >= 2) {
              this.imgThree = this.projectDetail.projectImgList[2]
            }
          }
          this.initMap(this.projectDetail)
        })
      }
    },
    created () {
    },
    mounted () {
      this.initDetailData()
    },
    onUnload () {
      this.mapUrl = ''
      this.infoShow = false
      this.dynamicShow = false
      this.imgOne = ''
      this.imgTwo = ''
      this.imgThree = ''
      this.isShow = false
      this.projectDetail = {}
    },
    onLoad () {
      this.projectId = this.$root.$mp.query.projectId
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
  /*楼盘图片*/
  .loupantu_body{ width:7.5rem; background:#fff; padding:0.3rem 0rem 0rem 0rem;}
  .loupantu_box{width:6.7rem; margin:0 auto; }
  .loupantu_tit{width:6.7rem; margin:0 auto;}
  .loupantu_tit h1{font-size:0.42rem; font-weight:800;color:rgba(19,29,53,1); float:left;}
  .loupantu_tit a{ padding:0rem 0.1rem;font-weight:500;height:0.36rem;border-radius:0.04rem; font-size:0.2rem;
    font-weight:normal;color:rgba(255,255,255,1); text-align:center; line-height:0.38rem; display:block; float:left; margin-top:0.14rem; margin-left:0.2rem;}
  .loupantu_tit .loupan_tit_A{background:#2D5AD6;}
  .loupantu_tit .loupan_tit_B{background:#FF9740;}
  .loupantu_tit h2{font-size:0.36rem; font-weight:normal;color:rgba(19,29,53,1); }

  .bieming{width:6.7rem; margin:0 auto;}
  .bieming h2{font-size:0.26rem; font-weight:normal;color:#9498A4; margin-top:0.2rem;}
  .zhanshitu_loupan{width:6.7rem; margin:0 auto; margin-top:0.15rem;}
  .zhanshitu_left{ float:left; width:4.6rem; height:3.2rem;}
  .zhanshitu_left img{width:4.6rem; height:3.2rem;}

  .zhanshitu_right{ float:right;width:2.1rem; height:3.2rem;}
  .zhanshitu_right img{width:2.1rem; height:1.6rem; margin-left:0.01rem; display:block;}
  .zhanshitu_right .zhanshitu_more{width:2.1rem; height:1.57rem;margin-left:0.01rem;margin-top:0.02rem; background:#FAFAFA; border:0.01rem solid rgba(255, 153, 0, 0);-moz-background-size: 100% 100%; background-size:100% 100%;}
  .zhanshitu_right .zhanshitu_more img{width:2.1rem; height:1.57rem;}
  .zhanshitu_right .zhanshitu_more p{ text-align:center;font-size:0.3rem; font-weight:normal;color:white; display:block; background:rgba(0,0,0,1);height:1.18rem;padding-top: 0.4rem;filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.6}
  .zhanshitu_right .zhanshitu_more b{ text-align:center;font-size:0.2rem; font-weight:300;color:#9C9EA0; display:block;}

  .jiage_box{width:6.7rem; height:1.6rem; margin:0 auto; overflow:hidden;}
  .jiage_box ul{width:6.7rem;margin-top: 0.1rem;}
  .jiage_box ul li{text-align:left; float:left; width:2.0rem; height:1rem; border-right:0.01rem solid #E6E6E6; margin-top:0.3rem;margin-left: 0.2rem}
  .jiage_box ul li p{font-size:0.26rem; font-weight:normal;color:#9498A4; display:block;width: 2rem;margin: 0 auto;}
  .jiage_box ul li h1{font-size:0.34rem; font-weight:normal;color:#E7624B; display:block;width: 2rem;margin: 0 auto;padding-top:0.12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}

  /*楼盘信息*/
  .loupaninfo_body{ width:7.5rem; background:#fff; padding:0.3rem 0rem 0rem 0rem; margin-top:0.2rem;}
  .loupaninfo_box{width:6.7rem; margin:0 auto; }
  .loupaninfo_tit{width:6.7rem; margin:0 auto;}
  .loupaninfo_tit h1{font-size:0.36rem; font-weight:500;color:rgba(19,29,53,1); padding-bottom:0.2rem; }
  .loupaninfo_box ul li p{ float:left;font-size:0.28rem; font-weight:normal;color:#9498A4;line-height:0.6rem; text-align:left; width:1.4rem;}
  .loupaninfo_box ul li b{ float:left;font-size:0.28rem; font-weight:normal;color:#3A4042;line-height:0.6rem;text-align:left; width:5.0rem;}
  .ssuo img{width:0.3rem;height: 0.3rem; margin:0 auto; display:block; padding:0.2rem 0rem;}
  /*户型介绍*/
  .huxing_body{ width:7.5rem; background:#fff; padding:0.3rem 0rem 0rem 0rem; margin-top:0.2rem;}
  .huxing_box{width:6.7rem; margin:0 auto; }
  .lhuxing_tit{width:6.7rem; margin:0 auto;}
  .lhuxing_tit h1{font-size:0.36rem; font-weight:500;color:rgba(19,29,53,1); padding-bottom:0.2rem; float:left;    line-height: 0.3rem;}
  .lhuxing_tit h2{font-size:0.28rem; font-weight:400;color:#9498A4; padding-bottom:0.2rem; float:right;    line-height: 0.3rem;}
  .huxing_box ul{width:6.7rem; margin:0 auto;  padding:0.1rem 0rem 0.1rem 0rem; overflow-y:hidden}
  .huxing_box .ulv{width:3rem; margin:0 auto;  padding:0.1rem 0rem 0.1rem 0rem; overflow-y:hidden;float: left}
  .huxing_box ul li{ width:100%;height: 4.1rem; padding-bottom:0.2rem;float:left;border-radius:0.1rem; margin-right:0.2rem;}
  .hx01 img{ width:2.9rem; height:2.8rem; margin:0 auto; margin-top:0.1rem; display:block;}
  .hx02{height: 0.6rem;line-height: 0.6rem;}
  .hx02 h1{ float:left;font-size:0.28rem; font-weight:normal;color:#3A4042; float:left; margin-left:0.2rem; width:1.7rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
  .hx02 p{ float:right;font-size:0.24rem; font-weight:400;color:#9498A4;margin-right:0.2rem;width: 0.9rem; text-align:right;}
  .hx03 {padding-left: 0.2rem}
  .hx03 a{ padding:0.03rem 0.1rem;height:0.36rem;border-radius:0.08rem; font-size:0.2rem; font-weight:500;color:#495060; text-align:center; line-height:0.38rem; display:block; float:left; margin-top:0.1rem;margin-right:0.1rem; border:1px solid #495060;}
  .hx03 a:last-child{ margin-left:0rem;}
  .hx04 p{font-size:0.32rem; font-weight:normal;color:#E7624B; margin-left:0.2rem; margin-top:0.2rem;}

  /*楼盘动态*/
  .loupandongtai_body{ width:7.5rem; background:#fff; padding:0.3rem 0rem 0rem 0rem; margin-top:0.2rem;}
  .loupandongtai_box{width:6.7rem; margin:0 auto; }
  .loupandongtai_tit{width:6.7rem; margin:0 auto;}
  .loupandongtai_tit h1{font-size:0.36rem; font-weight:500;color:rgba(19,29,53,1); padding-bottom:0.2rem; float:left;    line-height: 0.3rem;}
  .loupandongtai_tit h2{font-size:0.28rem; font-weight:400;color:#9498A4; padding-bottom:0.2rem; float:right;    line-height: 0.3rem;}
  .loupandongtai_list{ padding-bottom:0.3rem;}
  .loupandongtai_list h1{font-size:0.28rem; font-weight:500;color:#3A4042;line-height:0.4rem;}
  .loupandongtai_list p{font-size:0.28rem; font-weight:400;color:#9498A4; line-height:0.35rem; margin-top:0.05rem;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    word-wrap: break-word;}

  .loupandongtai_list b{font-size:0.28rem; font-weight:400;color:#3A4042;line-height:0.45rem;display: block;float:right;}


  /*周边配套*/
  .zhoubianpeitao_body{ width:7.5rem; background:#fff; padding:0.3rem 0rem 0rem 0rem; margin-top:0.2rem;}
  .zhoubianpeitao_box{width:6.7rem; margin:0 auto; }
  .zhoubianpeitao_tit{width:6.7rem; margin:0 auto;}
  .zhoubianpeitao_tit h1{font-size:0.36rem; font-weight:500;color:rgba(19,29,53,1); padding-bottom:0.2rem; }
  .zhoubianpeitao_box ul { padding-bottom:0.3rem;}
  .zhoubianpeitao_box ul li{ margin-top:0.2rem;}
  .zhoubianpeitao_box ul li p{ float:left;font-size:0.28rem; font-weight:400;color:#9498A4;line-height:0.5rem; text-align:left; width:1.4rem;}
  .zhoubianpeitao_box ul li b{ float:left;font-size:0.28rem;color:#3A4042;line-height:0.5rem;text-align:left; width:5.0rem;}

  /*位置周边*/
  .weizhizhoubian_body{ width:7.5rem; background:#fff; padding:0.3rem 0rem 0rem 0rem; margin-top:0.2rem;}
  .weizhizhoubian_box{width:6.7rem; margin:0 auto; padding-bottom:0.3rem;  }
  .weizhizhoubian_tit{width:6.7rem; margin:0 auto;}
  .weizhizhoubian_tit h1{font-size:0.36rem; font-weight:500;color:rgba(19,29,53,1); padding-bottom:0.2rem; }
  .zb_map{ width:6.7rem; height:2.9rem;padding-bottom: 1rem}
  .zb_map img{width: 100%;height:100%}
  /*底部按钮*/
  .btn{ width:7.5rem; height:1.4rem; background:#fff; position:fixed; bottom:0rem;left:0rem;z-index: 999999}
  .btn a{width:3.3rem; margin:0 auto; margin-top:0.25rem; float:left;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background:#af8f84;
    border-radius:0.12rem;
    color: #fff;  text-align:center; font-size:0.3rem; display:block;margin-left: 0.3rem;}

  .banner_box_swiper{width:100%;height: 100%}
</style>
