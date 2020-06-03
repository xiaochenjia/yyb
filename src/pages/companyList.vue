<template>
  <div id="app">
    <!--单行选择-->
    <div class="danhang_xuanze" v-for="(item, index) in companyList" :key="index" @click="goStoreClick(item)">
      <p>{{item.companyName}}</p>
      <img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow-right@3x.png"/>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        companyList: []
      }
    },
    components: {
    },
    methods: {
      goStoreClick (item) {
        this.$store.companyId = item.companyId
        this.$store.companyName = item.companyName
        this.$router.back()
      }
    },
    created () {
    },
    mounted () {
      this.typeId = this.$root.$mp.query.typeId
      console.log(this.typeId)
      this.companyList = []
      this.$iBox.http('Api.homeCompanyListApi')({}).then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].companyType === this.typeId) {
            this.companyList.push(res.data.list[i])
          }
        }
      })
    },
    onLoad () {
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
  .danhang_xuanze{ width:7.5rem; background:#fff; border-bottom:0.01rem solid #E5E5E5; height:1rem;}
  .danhang_xuanze p{ float:left; font-size:0.3rem; font-weight:bold;color:#3A4042; margin-left:0.2rem; line-height:1rem;}
  .danhang_xuanze .arr_right{  width:0.15rem; height: 0.26rem;float: right; margin-top: 0.05rem; margin-right:0.2rem; margin-top:0.37rem;}

</style>
