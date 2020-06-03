<template>
  <div id="app">
    <div class="top-head">
      <van-tabs :active="active" color="#2D5AD6" @change="onChange" line-width="50">
        <van-tab :title="item.name + '(' + item.list.length + ')'" v-for="(item, index) in imgList" :key="index"></van-tab>
      </van-tabs>
    </div>
    <!--图片展示-->
    <div class="tupian_box">
      <ul>
        <li v-for="(item, index) in imgResultList" :key="index">
          <img :src="item" @click="getImage(item)"/>
        </li>
      </ul>
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
        projectId: '',
        imgList: [],
        imgResultList: [],
        active: 0,
        noData: false
      }
    },
    components: {
    },
    methods: {
      initData () {
        this.$iBox.http('Api.projectImgListApi', {
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
          }
        })
      },
      onChange (event) {
        this.active = event.mp.detail.index
        this.imgResultList = this.imgList[this.active].list
        if (this.imgResultList.length > 0) {
          this.noData = false
        } else {
          this.noData = true
        }
      },
      getImage (url) {
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: this.imgResultList // 需要预览的图片http链接列表
        })
      }
    },
    mounted () {
      this.initData()
    },
    created () {
    },
    onUnload () {
      this.projectId = ''
      this.imgList = []
      this.imgResultList = []
      this.active = 0
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
  .tupian_box {
    width: 7.5rem;padding-top: 0.8rem;
  }
  .tupian_box ul li {
    float: left;
    width: 1.75rem;
    margin-left: 0.1rem;
    height: 1.75rem;
    margin-top: 0.1rem;
  }
  .tupian_box ul li img {
    width: 1.75rem;
    height: 1.75rem;
  }
  .clear{clear:both}
  .top-head{
    position:fixed; width:100%;height:auto; overflow-y:auto;min-height: 60px;line-height: 60px;z-index: 9999999;
  }
</style>
