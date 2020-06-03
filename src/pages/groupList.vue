<template>
  <div id="app">
    <!--头部标题-->
    <div class="team_tit">
      <h1>我的团队</h1>
    </div>
    <!--门店-->
    <div class="mendian_body">
      <div class="mendian_list" @click="gotoLists" v-for="(store, index) in storeList" :key="index">
        <div class="mendian_tit">
          <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/md_icon@3x.png" />
          <h1>
            {{ store.storeName }}
            <span>({{ store.storeNum }})</span>
          </h1>
        </div>
        <!-- 员工列表 -->
      </div>
    </div>
    <div v-show="noData" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png" />
      <p>暂无数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      idx: 0,
      noData: false, //暂无数据
      storeList: [],
      value: ''
    }
  },
  components: {},
  methods: {
    gotoLists() {
      const path = '/pages/groupLists'
      const query = {}
      this.$router.push({ path, query, reLaunch: false })
    },
    initData() {
      this.$iBox
        .http('Api.groupListApi')({})
        .then(res => {
          console.log(res) //通过此接口获取我的团队
          this.storeList = res.data.list
        })
    }
  },

  created() {},
  mounted() {
    this.initData()
  },
  onUnload() {
    this.idx = 0
    this.storeList = []
  },
  onLoad() {},
  onShow() {
    if (
      this.$store.groupListRefresh !== undefined &&
      this.$store.groupListRefresh === true
    ) {
      this.initData()
      this.$store.groupListRefresh = false
    }
  }
}
</script>

<style scoped>
:after {
  content: '\0020';
  display: block;
  height: 0;
  clear: both;
}

/*头部标题*/
.team_tit {
  width: 7.5rem;
  height: 1.4rem;
  background: #2d5ad6;
  border: 0.01rem solid #2d5ad6;
  box-sizing: border-box;
  position: relative;
}
.team_tit h1 {
  font-size: 0.4rem;
  color: #fff;
  margin-left: 0.2rem;
  margin-top: 0.28rem;
  background: #2d5ad6;
}

/*头部标题*/
.mendian_body {
  width: 7.5rem;
}
.mendian_list {
  width: 7.1rem;
  margin: 0 auto;

  background: #fff;
  margin-bottom: 0.3rem;
  box-shadow: 0 0.02rem 0.3rem 0 rgba(154, 181, 255, 0.18);
}
.mendian_tit {
  height: 0.88rem;
  width: 7.1rem;
}
.mendian_tit img {
  float: left;
  width: 0.34rem;
  height: 0.34rem;
  display: block;
  margin-left: 0.2rem;
  margin-top: 0.27rem;
}
.mendian_tit h1 {
  float: left;
  display: block;
  font-size: 0.3rem;
  color: #3a4042;
  font-weight: 500;
  line-height: 0.88rem;
  margin-left: 0.1rem;
}

.mendian_tit .off {
  color: #a3a3a3;
}
.mendian_tit .on {
  color: #393939;
}
</style>
