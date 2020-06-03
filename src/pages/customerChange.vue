<template>
  <div id="app">
    <!--纵向时间轴-->
    <div class="htmleaf-container">
      <div class="container">
        <div id="timeline" v-for="(item, index) in changeList" :key="index">
          <div class="timeline-item">
            <div class="timeline-icon"> </div>
            <div class="timeline-content">
              <h2>{{item.list.changeDate}}</h2>
              <p>{{item.list.changeDesc}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="noData" class="wdl_box">
      <img src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/wushuju_icon.png"/>
      <p>暂无客户变更数据</p>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        changeList: [],
        customerId: '',
        noData: false
      }
    },
    components: {
    },
    methods: {
      initData () {
        this.$iBox.http('Api.customerChangeListApi', {
          'customerId': this.customerId
        })({}).then((res) => {
          this.changeList = res.data === undefined ? [] : res.data
          if (this.changeList.length > 0) {
            this.noData = false
          } else {
            this.noData = true
          }
        })
      }
    },
    created () {
    },
    mounted () {
      this.initData()
    },
    onLoad () {
      this.customerId = this.$root.$mp.query.customerId
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
  .container {
    width: 7.5rem;
    margin: 0 auto;
  }
  #timeline {
    width: 6.5rem;
    margin: 0.3rem auto;
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
    height: 100%;
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
    font-size:0.24rem;
    position: absolute;
    top: 0.5rem;
    left: -0.45rem;
    overflow: hidden;
    padding: 0.2rem 0rem;    color: #989898;
  }
  #timeline .timeline-item .timeline-content {
    width: 5.2rem;
    margin-left: 1.2rem;
    background: #fff;
    box-shadow: 0.01rem 0.06rem 0.1rem 0.05rem rgba(84, 84, 84, 0.12);
    border-radius: 5px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  #timeline .timeline-item .timeline-content h2 { padding:0.2rem 0.2rem;
    line-height: 0.4rem;
    background: #2D5AD6;
    color: #fff;
    font-weight: 500;
    border-radius: 0.1rem 0.1rem 0 0;
    font-size: 0.3rem;
  }
  #timeline .timeline-item .timeline-content p {
    font-size: 0.28rem;
    padding: 0.2rem;
  }
  #timeline .timeline-item .timeline-content:before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0.2rem;
    width: 0;
    height: 0;
    border-width: 0.1rem;
    border-style: solid;
    border-color: transparent;
    margin-bottom: 0.01rem;
    border-right-width: 0.1rem;
    border-right-color: currentColor;
    color: #2D5AD6;
  }
  #timeline .timeline-item .timeline-content.right {
    float: right;
  }
  #timeline .timeline-item .timeline-content.right:before {
    content: '';
    right: 45%;
    left: inherit;
    border-left: 0;
    border-right: 7px solid #2D5AD6;
  }
</style>
