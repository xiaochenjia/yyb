<template>
  <div id="app" style="background:#fff;">
    <div class="top-head">
      <van-tabs :active="active" color="#2D5AD6" @change="onChange" line-width="50">
        <van-tab :title="item.name + '(' + item.list.length + ')'" v-for="(item, index) in imgList" :key="index"></van-tab>
      </van-tabs>
    </div>
    <!--纵向时间轴-->
    <div class="htmleaf-container">
      <div class="container">
        <div id="timeline">
          <div class="timeline-item" v-for="(item, indexs) in imgResultList" :key="indexs" @click="toDetail(item)">
            <div class="timeline-icon"> </div>
            <div class="timeline-shijian">{{item.dynamicDate}}</div>
            <div class="timeline-content">
              <h2>{{item.dynamicName}}</h2>
              <p>{{item.dynamicDesc}} </p>
            </div>
          </div>
        </div>
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
        noData: false
      }
    },
    components: {
    },
    methods: {
      initData () {
        this.$iBox.http('Api.projectDynamicListApi', {
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
      toDetail (item) {
        const path = '/pages/projectDynamicDetail'
        const query = {
          'dynamicId': item.dynamicId,
          'messageName': item.dynamicName
        }
        this.$router.push({ path, query, reLaunch: false })
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
  .fenlei_box{ width:7.5rem; height:0.9rem; background:#fff; display:flex;position: fixed;
    top: 0rem; z-index:99;}
  .fenlei_box a{ font-size:0.28rem; font-weight:500; line-height:0.9rem;flex: 1; text-align:center; color:#3A4042;}
  .fenlei_box .current{ font-size:0.32rem; color:#2D5AD6; border-bottom:0.03rem solid #2D5AD6;}

  .htmleaf-container {
    padding-top: 0.8rem;
  }
  .container {
    width: 7.5rem;
    margin: 0 auto;
  }
  #timeline {
    width: 6.5rem;
    margin: 0.6rem auto;
    position: relative;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -ms-transition: all 0.4s ease;
    transition: all 0.4s ease;
    margin-left: 0.6rem;
  }
  #timeline:before {
    content: "";
    width: 0.02rem;
    height: 85%;
    background: #e8e8e8;
    left: 0.18rem;
    top: 0.4rem;
    position: absolute;
  }
  #timeline:after {
    content: "";
    clear: both;
    display: table;
    width: 100%
  }
  #timeline .timeline-item {
    margin-bottom: 0.7rem;
    position: relative;
  }
  #timeline .timeline-item .timeline-icon {
    background: #fff;
    border: 0.06rem solid #2D5AD6;
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    top: 0.1rem;
    left: 0.035rem;
    overflow: hidden;
    border-radius: 100rem;
  }
  #timeline .timeline-item .timeline-shijian {
    background: #fff;
    font-size: 0.28rem;
    position: absolute;
    top: -0.6rem;
    left: -0.45rem;
    overflow: hidden;
    padding: 0.2rem 0rem 0rem 0rem;
    color: #5e7ca9;
  }
  #timeline .timeline-item .timeline-content {
    width: 6.2rem;
    margin-left: 0.5rem;
    background: #fff;
    border-radius: 5px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  #timeline .timeline-item .timeline-content h2 { padding:0.2rem 0.2rem;
    padding: 0.06rem 0rem 0.2rem 0.2rem;
    line-height: 0.4rem;
    color: #333;
    font-weight: 500;
    border-radius: 0.1rem 0.1rem 0 0;
    font-size: 0.3rem;
  }
  #timeline .timeline-item .timeline-content p {
    font-size: 0.28rem;
    padding: 0rem 0.2rem; color:#929292;
  }


  /*#timeline .timeline-item .timeline-content.right {*/
    /*float: right;*/
  /*}*/
  /*#timeline .timeline-item .timeline-content.right:before {*/
    /*content: '';*/
    /*right: 45%;*/
    /*left: inherit;*/
    /*border-left: 0;*/
    /*border-right: 7px solid #2D5AD6;*/
  /*}*/
  .clear{clear:both}
  .top-head{
    position:fixed; width:100%;height:auto; overflow-y:auto;min-height: 60px;line-height: 60px;z-index: 9999999;
  }
</style>
