<template>
  <div id="app">
    <div class="top-head">
      <van-tabs :active="active" color="#2D5AD6" @change="onChange" line-width="50">
        <van-tab :title="item.name + '(' + item.list.length + ')'" v-for="(item, index) in imgList" :key="index"></van-tab>
      </van-tabs>
    </div>
    <!--户型-->
    <div class="huxing_body">
      <div class="huxing_box">
        <ul>
          <li v-for="(item, indexs) in imgResultList" :key="indexs">
            <div class="hx01"> <img :src="item.housingTypeImg" @click="getImage(item.housingTypeImg)"/></div>
            <div class="hx02">
              <h1>{{item.housingTypeName}}</h1>
              <p>{{item.housingTypeArea}}</p>
            </div>
            <div class="hx03" v-if="item.housingTypeTrait !== undefined && item.housingTypeTrait.length > 0">
              <a v-for="(obj, index) in item.housingTypeTrait" :key="index">{{obj}}</a>
            </div>
            <!--<div class="hx04">-->
              <!--<p>{{item.housingTypePrice}}</p>-->
            <!--</div>-->
          </li>
        </ul>
      </div>
    </div>
    <div v-show="noData" class="font_box">
      <p>暂无数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        active: 0,
        projectId: '',
        imgList: [],
        imgResultList: [],
        photoList: [],
        noData: false
      }
    },
    components: {
    },
    methods: {
      initData () {
        this.$iBox.http('Api.projectHousingTypeListApi', {
          'projectId': this.projectId
        })({}).then((res) => {
          this.imgList = res.data
          if (this.imgList.length > 0) {
            this.imgResultList = this.imgList[0].list
            if (this.imgResultList.length > 0) {
              this.noData = false
            } else {
              this.noData = true
            }
            this.photoList = []
            for (let i = 0; i < this.imgResultList.length; i++) {
              this.photoList.push(this.imgResultList[i].housingTypeImg)
            }
          }
        })
      },
      onChange (event) {
        this.active = event.mp.detail.index
        this.imgResultList = this.imgList[this.active].list
        this.photoList = []
        for (let i = 0; i < this.imgResultList.length; i++) {
          this.photoList.push(this.imgResultList[i].housingTypeImg)
        }
        if (this.imgResultList.length > 0) {
          this.noData = false
        } else {
          this.noData = true
        }
      },
      getImage (url) {
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: this.photoList // 需要预览的图片http链接列表
        })
      }
    },
    mounted () {
      this.initData()
    },
    created () {
    },
    onUnload () {
      this.active = 0
      this.projectId = ''
      this.imgList = []
      this.imgResultList = []
      this.photoList = []
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
  /*tab菜单*/
  .fenlei_box {
    width: 7.5rem;
    height: 0.9rem;
    background: #fff;
    display: flex;
    position: fixed;
    top: 0rem;
    z-index: 99;
  }
  .fenlei_box a {
    font-size: 0.28rem;
    font-weight: 500;
    line-height: 0.9rem;
    flex: 1;
    text-align: center;
    color: #3A4042;
  }
  .fenlei_box .current {
    font-size: 0.32rem;
    color: #2D5AD6;
    border-bottom: 0.03rem solid #2D5AD6;
  }
  .container {
    width: 7.5rem;
    margin: 0 auto;
  }

  /*户型介绍*/
  .huxing_body{ width:7.5rem; background:#fff;padding-top: 0.8rem;}
  .huxing_box{width:6.7rem; margin:0 auto; }
  .huxing_box ul{width:6.7rem; margin:0 auto;  padding:0.1rem 0rem 0.4rem 0rem; }
  .huxing_box ul li{ width:6.7rem; padding-bottom:0.2rem; border:0.01rem solid #E0E0E0;border-radius:0.1rem; margin-top:0.3rem;}
  .hx01 img{ width:6.3rem; height:6.3rem; margin:0 auto; margin-top:0.1rem; display:block;}
  .hx02{height: 0.6rem;line-height: 0.6rem;}
  .hx02 h1{ float:left;font-size:0.3rem; font-weight:500;color:#3A4042; float:left; margin-left:0.2rem;
    width:5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
  .hx02 p{ float:right;font-size:0.28rem; font-weight:400;color:#9498A4;margin-right:0.2rem;width: 0.9rem; text-align:right;}

  .hx03 {padding-left: 0.2rem}
  .hx03 a{ padding:0.03rem 0.1rem;height:0.36rem;border-radius:0.08rem; font-size:0.2rem; font-weight:500;
    color:#9498A4; text-align:center; line-height:0.38rem; display:block; float:left; margin-top:0.1rem;margin-right:0.1rem; border:0.015rem solid #9498A4;}
  .hx03 a:last-child{ margin-left:0rem;}
  .hx04 p{font-size:0.32rem; font-weight:500;color:#E7624B; margin-left:0.2rem; margin-top:0.2rem;}
  .clear{clear:both}
  .top-head{
    position:fixed; width:100%;height:auto; overflow-y:auto;min-height: 60px;line-height: 60px;z-index: 9999999;
  }
</style>
