<template>
  <div id="app">
    <!--搜索-->
    <div class="search_kh">
      <div class="search_box">
        <div class="search_left"> <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/sousuo_icon.png"/>
          <input placeholder="输入楼盘名称 " v-model="value" name="value"/>
        </div>
        <div class="search_right" @click="goSearchClick">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/ss_icon.png"/>
          <p>搜索</p>
        </div>
        <div class="clr"></div>
      </div>
    </div>
    <div style="height:3.6rem;"></div>
    <!--搜索结果-->
    <div class="fang_box">
      <div class="fang_list" v-for="(item, index) in projectList" :key="index" @click="selectProjectClick(item)">
        <div class="fang_left"> <img :src="item.mainImg"/> </div>
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
      </div>
    </div>
    <div v-show="noData" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png"/>
      <p>暂无楼盘数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        projectList: [],
        type: '',
        value: '',
        noData: false
      }
    },
    components: {
    },
    methods: {
      selectProjectClick (item) {
        this.$store.customerAuthReport = item
        this.$router.back()
      },
      initData () {
        this.$iBox.http('Api.projectListForCustomerApi', {
          'type': 'name',
          'value': this.value,
          'isLoad': 'false'
        }, true)({}).then((res) => {
          this.projectList = res.data.list
          if (this.projectList.length) {
            this.noData = false
          } else {
            this.noData = true
          }
        })
      },
      goSearchClick () {
        this.initData()
      }
    },
    created () {
    },
    mounted () {
      this.initData()
    },
    onLoad () {
    },
    onShow () {
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

  .search_kh{width:7.5rem; height:1.28rem; background:#fff; overflow:hidden; position:fixed; z-index:999; top:0rem; left:0rem; border-bottom:0.01rem solid #ececec}
  .search_box{ width:7.1rem; height:0.9rem; background:#F8F8F8; margin:0 auto; border-radius:100rem; margin-top:0.2rem;}
  .search_left{ float:left; width:5.3rem;}
  .search_left img{ width:0.3rem; height:0.3rem; display:block; float:left; margin-top:0.31rem; margin-left:0.5rem;}
  .search_left input{ width:4.2rem; display:block; float:left;border-radius: 0rem;
    outline: none;height: 0.5rem;line-height: 0.5rem;border: none;background: none;
    margin-left: 0.1rem; margin-top:0.2rem; font-size:0.3rem;border-right: 0.01rem solid #CECECE;}
  .search_right{ float:left; width:1.76rem;}
  .search_right img{ width:0.42rem; height:0.42rem; display:block; float:left; margin-top:0.25rem; margin-left:0.2rem;}
  .search_right p{display:block; float:left;font-size:0.3rem; color:#131D35;
    font-weight:bold; line-height:0.9rem; margin-left:0.15rem;}
  /*搜索结果*/
  .fang_box{ width:7.5rem;margin:0 auto;    background: #fff;}
  .fang_list{ width:6.7rem; height:2.38rem; border-bottom:0.01rem solid #E5E5E5; margin:0 auto;}
  .fang_list:last-child{border-bottom:none;}
  .fang_list .fang_left{ float:left; width:2.1rem; height:1.6rem; margin-top:0.4rem;}
  .fang_list .fang_left img{ width:2.1rem; height:1.6rem; }
  .fang_list .fang_right{ float:left; width:2.1rem; height:1.6rem; margin-top:0.4rem; width:4.2rem; margin-left:0.3rem; position:relative;}
  .fang_list .fang_right h1{font-size:0.32rem; font-weight:500;color:rgba(19,29,53,1);line-height:0.44rem; }
  .fang_list .fang_right p{font-size:0.24rem; font-weight:400;color:rgba(156,158,160,1);line-height:0.34rem;margin-top:0.04rem;}
  .fang_list .fang_right h2{font-size:0.3rem; font-weight:500;color:rgba(231,98,75,1);line-height:0.42rem;margin-top:0.08rem;
    width: 4.0rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}
  .fang_list .fang_right h2 span{font-size:0.24rem; font-weight:400;color:rgba(156,158,160,1);line-height:0.34rem; margin-left:0.4rem;}
  .fang_list .fang_right .zaishou{width:0.65rem;height:0.36rem;background:#19BE6B;border-radius:0.04rem; font-size:0.2rem;
    font-weight:500;color:rgba(255,255,255,1); text-align:center; line-height:0.38rem; display:block; position:absolute;right:-0.12rem; top:0.04rem;}
  .fang_list .fang_right .zhuzhai{width:0.65rem;height:0.34rem;border-radius:0.04rem; font-size:0.2rem;
    font-weight:500;color:#495060; text-align:center; line-height:0.36rem; display:block; position:absolute;right:0.65rem; top:0.04rem;border: 0.01rem solid #495060}
</style>
